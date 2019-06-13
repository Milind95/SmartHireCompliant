import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { BookingEvent } from '../../../Shared/dataModal/bookingSlot.modal';
import { Router } from '@angular/router';

export class SharedData {
    subscription: Subscription;
    currentSlotInfo: BookingEvent[];
    selectedDateFromCalendar: string;
    selectedDateObjectFromCalendar: {
        date: number,
        month: number,
        year: number
    }
    currentDay: string;
    currentDate: number;
    noDataAvailableMsg: string = null;
    isPastDate: boolean = false;
    yesterdayDate: Date = new Date((new Date().setDate(new Date().getDate() - 1)));
    step = null;

    constructor(private dataService: DataService, private color: string, private routerData: Router) {
        console.log("inside shared file", color);


        this.subscription = this.dataService.slotSubject.subscribe((res: BookingEvent[]) => {
            console.log(res);
            this.currentSlotInfo = res.filter(slots => {
                return slots.color["name"] === color
            });
            if (this.currentSlotInfo.length !== 0) {
                this.availablecommonSetDayandDate(this.currentSlotInfo);
                this.selectedDateFromCalendar = this.availablecommonDateFormatter(this.currentSlotInfo[0].start);
                this.selectedDateObjectFromCalendar = null;
            } else {
                this.dataService.selectedDateSubject.subscribe((date: Date) => {
                    this.selectedDateFromCalendar = this.availablecommonDateFormatter(date);
                    this.selectedDateObjectFromCalendar = null;
                    this.noDataAvailableMsg = "No slots available";
                });

            }
        });
    }

    setStep(index: number) {
        console.log(index);
        this.step = index;
    }


    availablecommonSetDayandDate(data) {
        if (data.length !== 0) {
            this.currentDay = this.availablefetchWeekDaybyNumber(data[0].start.getDay());
            this.currentDate = data[0].start.getDate();
        }
    }


    availablecommonDateFormatter(dateInput: Date) {
        let date;
        let month;
        let year;
        let totalString;
        this.isPastDate = dateInput.getTime() > this.yesterdayDate.getTime();


        date = dateInput.getDate();
        month = dateInput.getMonth();
        year = dateInput.getFullYear();
        totalString = `${date}-${this.availablefetchMonthbyNumber(month)}-${year}`;
        return totalString;
    }


    availablefetchWeekDaybyNumber(number) {
        let day = "";
        switch (number) {
            case 0:
                day = "Sun";
                break;
            case 1:
                day = "Mon";
                break;
            case 2:
                day = "Tue";
                break;
            case 3:
                day = "Wed";
                break;
            case 4:
                day = "Thur";
                break;
            case 5:
                day = "Fri";
                break;
            case 6:
                day = "Sat";
                break;
        }
        return day;
    }


    availablefetchMonthbyNumber(number) {
        return this.dataService.commonMonth(number);
    }


    getTimeFromDatein12HoursFormat(date: Date) {
        let timeInAmPmFormat: string = "";
        let time = date.getHours();
        let minutesNum = date.getMinutes();
        let minutes = minutesNum < 10 ? (0 + minutesNum.toString()) : minutesNum === 0 ? "00" : minutesNum;
        if (time > 12) {
            timeInAmPmFormat = (time - 12).toString() + ":" + minutes + " " + "PM"
        } else if (time === 12) {
            timeInAmPmFormat = "12" + ":" + minutes + " " + "PM"
        } else {
            timeInAmPmFormat = (time).toString() + ":" + minutes + " " + "AM"
        }
        return timeInAmPmFormat;
    }

    commonPartOfBookingForm(slotInfo, flag) {
        let value = this.selectedDateFromCalendar.split("-");
        let monthNumber: number;
        this.dataService.months.forEach((month, index) => {
            if (month === value[1]) {
                monthNumber = index;
            }
        });
        let year = Number(value[2]);
        let date = Number(value[0]);
        let selectedDate = new Date(year, monthNumber, date);
        console.log(selectedDate);
        this.routerData.navigate(["/booking-form"]);
        this.dataService.setBookingDataForBookingForm({
            dateInString: this.selectedDateFromCalendar,
            dateInObject: this.selectedDateObjectFromCalendar,
            date: selectedDate,
            slotInfo: slotInfo,
            from: "available"
        });
    }

}
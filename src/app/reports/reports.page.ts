import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Platform } from '@ionic/angular';



@Component({
    selector: 'app-reports',
    templateUrl: './reports.page.html',
    styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
    devWidth: any;
    mobileView: boolean = false;
    selectedOrg: number;
    selectedDay: number = 0;
    valueOfButton = "Tabular";
    chartOptions: any;
    dateRangeArr = [];
    tableChartOptions: Object;
    selectedRow: any;
    columnClicked: any;
    availablePieChart: any;
    bookedPieChart: any;
    interviewedPieChart: any;
    notInterviewedPieChart: any;
    bookedBarChartL1: any[];
    availableBarChartL1: any[];
    notInterviewedBarChartL1: any[];
    bookedBarChartL2: any[];
    interviewedBarChartL2: any[];
    availableBarChartL2: any[];
    notInterviewedBarChartL2: any[];
    totalAvailableChartL1: any[];
    totalBookedChartL1: any[];
    totalInterviewedChartL1: any[];
    totalNotInterviewedChartL1: any[];
    totalAvailableChartL2: any[];
    totalBookedChartL2: any[];
    totalInterviewedChartL2: any[];
    totalNotInterviewedChartL2: any[];
    interviewedBarChartL1: any;

    backTechColor: string = "#C0C0C0";
    backdayColor: string = "#C0C0C0";
    backAccColor: string = "#C0C0C0";
    backOrgColor: string = "#C0C0C0";
    candidateName:string;
    recruiterIdArray: any[];
    initialFrom: any;
    initialTo: any;
    filterDaysSelected: any;
    reportRequestBody: { "fromTime": any; "toTime": any; "interviewerEmailId": any; "techId": any[]; "supervisorEmailId": any; "interviewTypeId": number; "recruiterEmailId": any; "daysFilter": any; "buId": number; "accountId": any[]; };
    showCheckTech: boolean;
    valueOfButton1 = "Enable";
    showTmpl1: any;
    showTmpl2: boolean;
    valueOfButton2 = "Enable";
    options: Object;
    selectedTechnology = [];
    orgCheckboxValue = "Enable";
    selectedMarketUnitValue = [];
    techCheckboxValue = "Enable";
    reportTableName = "ALL";
    combinedReportsData = [];
    dataSource = new MatTableDataSource(this.combinedReportsData);
    feedbackStatus:any;
    loadingIndicator: boolean = true;
    limit: number = 6;
    columnData = [];
    rowData = [];

    // rowData = [
    //     { nameabc: "Austin", gender: 'Female', company: 'Swimlane', age: '15', location: 'banglore', grade: 'C2', milind: "Vasu", vasu: "123" },
    //     { nameabc: 'Austin', gender: 'Female', company: 'gamelane', age: '18', location: 'chennai', grade: 'A5', milind: "Vasu", vasu: "123" },
    // ];
    // columnData = [
    //     { prop: "nameabc", name: "nameabc" },
    //     { prop: 'gender', name: 'Gender' },
    //     { prop: 'company', name: 'Company' },
    //     { prop: 'age', name: 'Age' },
    //     { prop: 'location', name: 'Location' },
    //     { prop: 'grade', name: 'Grade' },
    //     { prop: 'milind', name: 'Milind' },
    //     { prop: 'vasu', name: 'Vasu' },

    // ];

    // rowData = [
    //     {
    //         Account: "TCG",
    //         BookingDate: "Tue Apr 23 2019",
    //         CandidateName: "NA",
    //         CreationDate: "Wed Apr 03 2019",
    //         Download: "NA",
    //         FeedbackStatus: "NA",
    //         FromTime: "11:00:00",
    //         InterviewType: "L1",
    //         InterviewerEmail: "akshat.mangal@capgemini.com",
    //         InterviewerEmpId: 1,
    //         InterviewerGrade: "B1",
    //         InterviewerLocation: "CKP",
    //         InterviewerName: "Akshat",
    //         InterviewerSkills: "Angular,Java,Python 2",
    //         InterviewerType: "L1",
    //         IsBooked: "N",
    //         MarkeUnit: "Industrial Unit",
    //         Organization: "AppsNA-CSD",
    //         ParticipationType: "Face to Face",
    //         RecruiterEmail: "NA",
    //         RecruiterEmpId: "NA",
    //         RecruiterName: "NA",
    //         SlotStatus: "AVAILABLE",
    //         Technology: "NA",
    //         ToTime: "12:00:00",
    //     }
    // ];
    // columnData = [
    //     { prop: "Account", name: "Account" },
    //     { prop: "BookingDate", name: "BookingDate" },

    //     { prop: "InterviewerName", name: "InterviewerName" },
    //     { prop: "InterviewType", name: "InterviewType" },
    //     { prop: "CandidateName", name: "CandidateName" },
    //     { prop: "FeedbackStatus", name: "FeedbackStatus" },
    //     { prop: "FromTime", name: "FromTime" },
    //     { prop: "ToTime", name: "ToTime" },
    //     { prop: "InterviewerEmpId", name: "InterviewerEmpId" },
    //     { prop: "InterviewerEmail", name: "InterviewerEmail" },
    //     { prop: "InterviewerGrade", name: "InterviewerGrade" },
    //     { prop: "InterviewerLocation", name: "InterviewerLocation" },
    //     { prop: "InterviewerSkills", name: "InterviewerSkills" },
    //     { prop: "InterviewerType", name: "InterviewerType" },
    //     { prop: "ParticipationType", name: "ParticipationType" },
    //     { prop: "CreationDate", name: "CreationDate" },
    //     { prop: "IsBooked", name: "IsBooked" },
    //     { prop: "Technology", name: "Technology" },
    //     { prop: "RecruiterEmpId", name: "RecruiterEmpId" },
    //     { prop: "RecruiterName", name: "RecruiterName" },
    //     { prop: "RecruiterEmail", name: "RecruiterEmail" },
    //     { prop: "SlotStatus", name: "SlotStatus" },
    //     { prop: "MarkeUnit", name: "MarkeUnit" },
    //     { prop: "Organization", name: "Organization" },
    //     { prop: "Download", name: "Download" }
    // ];

    public bankFilterCtrl: FormControl = new FormControl();

    filteredValues = {
        SlotStatus: '', InterviewerEmpId: '', InterviewerName: '', InterviewerEmail: '', InterviewerGrade: '', InterviewerLocation: '',
        InterviewerSkills: '', ParticipationType: '', InterviewType: '', CreationDate: '', BookingDate: '',
        FromTime: '', ToTime: '', IsBooked: '', Technology: '', CandidateName: '', RecruiterEmpId: '', RecruiterName: '',
        RecruiterEmail: '', FeedbackStatus: '', Account: '', MarkeUnit: '', Organization: ''

    };
    excelDownloadindex: number;
    marketUnitDisabled: boolean = true;
    selectAccoutnDisabled: boolean = true;

    datevalues = [];
    dateTimeRange: any;
    nochartdata: number;
    toggleOrgChange: boolean;
    toggleTechChange: boolean;


    constructor(private service: DataService, private router: Router,
        private platform: Platform,
        private spinner: NgxSpinnerService) { this.devWidth = this.platform.width() }
    InterviewerEmpId = new FormControl();
    InterviewerName = new FormControl();
    InterviewerEmail = new FormControl();
    InterviewerGrade = new FormControl();
    InterviewerLocation = new FormControl();
    InterviewerSkills = new FormControl();
    ParticipationType = new FormControl();
    InterviewType = new FormControl();
    CreationDate = new FormControl();
    BookingDate = new FormControl();
    FromTime = new FormControl();
    ToTime = new FormControl();
    IsBooked = new FormControl();
    Technology = new FormControl();
    CandidateName = new FormControl();
    RecruiterEmpId = new FormControl();
    RecruiterName = new FormControl();
    RecruiterEmail = new FormControl();
    FeedbackStatus = new FormControl();
    SlotStatus = new FormControl();
    Account = new FormControl();
    MarkeUnit = new FormControl();
    Organization = new FormControl();
    days = [
        { id: 0, viewValue: 'All Day' },
        { id: 1, viewValue: 'Week Day' },
        { id: 2, viewValue: 'Week End' }
    ];
    public selectedMoment = new Date();
    buArray: any = [];
    buarray: any = [];
    filterIcon: boolean = false;
    popoverController: any;
    enableTechology: boolean = false;
    checkboxDisabled: boolean = true;
    checkboxDisabledOrg: boolean = true;
    reportEnable: boolean = true;
    marketUnitArray = [];
    accountsArray = [];
    accountId: any;
    time: any;
    completeReportData = [];
    availableArray = [];
    bookedArray = [];
    interviewedArray = [];
    notInterviewedArray = [];
    optionsModel: number[];
    technologyArray: any = [];
    technologyArrayReplica = [];
    techArray = [];
    slotCountArray = [];
    mobileFilter: boolean = false;

    displayedColumns: string[] = ['InterviewerEmpId', 'InterviewerName', 'InterviewerEmail', 'InterviewerGrade', 'InterviewerLocation',
        'InterviewerSkills', 'ParticipationType', 'InterviewType', 'CreationDate', 'BookingDate', 'FromTime', 'ToTime',
        'IsBooked', 'Technology', 'CandidateName', 'RecruiterEmpId', 'RecruiterName', 'RecruiterEmail', 'FeedbackStatus',
        'SlotStatus', 'Account', 'MarkeUnit', 'Organization', 'Download'];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;





    ngOnInit() {

        setTimeout(() => { this.loadingIndicator = false; }, 2500);

        console.log("this.devWidth", this.devWidth);
        let currentDate = [new Date().setMonth(new Date().getMonth() - 1), new Date().getTime()];
        let dateTimeRangeStart = new Date(currentDate[0]);
        let dateTimeRangeEnd = new Date(currentDate[1]);
        this.dateTimeRange = [dateTimeRangeStart, dateTimeRangeEnd]

        console.log("this is a new date time", currentDate)

        this.service.eventEmitterForEvent.subscribe(res => {
            console.log("emitted event is", res);
            if (res.flag) {
                this.technologyArray = this.service.technologyArray;
                this.technologyArrayReplica = this.technologyArray;
                console.log("Technology array data", this.technologyArray)
                this.buArray = this.service.buArray
                console.log("technologyArray ", this.technologyArray);
                console.log("BUArray ", this.buArray);
                this.techArray = [];
                this.technologyArray.forEach(tech => {
                    this.techArray.push({
                        id: tech.id,
                        name: tech.value
                    });
                });

            }
            console.log("yaaha dekho", this.buarray);
        })
        this.service.getlookUpData();
        this.reportsFunction();
    }
    onChange() {
        console.log(this.optionsModel);
    }

    settings: IMultiSelectSettings = {
        enableSearch: true,
        showCheckAll: true,
        showUncheckAll: true,
        fixedTitle: false
    };

    prefixSearchFunction(str: string): RegExp {
        return new RegExp('^' + str, 'i');
    }


    techEnable() {
        if (this.techEnable) {
            return (this.enableTechology = true)
        }
    }

    reportsFunction() {
        this.spinner.show();
        console.log('inside reports');
        let start, end;
        if (this.dateRangeArr.length > 0) {
            start = new Date(this.dateRangeArr[0]).getTime();
            end = new Date(this.dateRangeArr[1]).getTime();

        } else {
            start = new Date().setMonth(new Date().getMonth() - 1);
            end = new Date().getTime();

        }

        let obj = {
            fromTime: start,
            toTime: end,
            interviewerEmailId: null,
            techId: this.selectedTechnology !== undefined ? this.selectedTechnology : [],
            supervisorEmailId: null,
            interviewTypeId: 0,
            recruiterEmailId: null,
            daysFilter: this.selectedDay,
            buId: this.selectedOrg !== undefined ? this.selectedOrg : 0,
            accountId: this.accountId !== undefined ? this.accountId : []
        }


        console.log("this is body ", obj)
        this.service.eventEmitterForReports.subscribe(res => {
            if (res.flag) {
                this.completeReportData = this.service.completeReportArray;
                this.availableArray = this.service.availableArray;
                this.bookedArray = this.service.bookedArray;
                this.interviewedArray = this.service.interviewedArray;
                this.notInterviewedArray = this.service.notInterviewedArray;

                if ((this.availableArray[0].statusCount === 0 && this.bookedArray[0].statusCount === 0 && this.interviewedArray[0].statusCount === 0 && this.notInterviewedArray[0].statusCount === 0)) {
                    this.nochartdata = 0;
                } else {
                    this.nochartdata = 1;
                }
                console.log('this.completeReportData', this.completeReportData, this.availableArray, this.interviewedArray);
                this.slotCountArray = [];

                this.completeReportData.forEach(rep => {
                    this.slotCountArray.push(rep.statusCount);
                })
                console.log('going to show charts')
                this.pieChart();
                this.barChart();
                console.log("this.reportTableName ......", this.reportTableName);
                if (this.reportTableName === 'ALL' && !this.reportEnable) {
                    this.tabularReport(this.completeReportData, null);
                } else this.reportEnable = true;

                this.spinner.hide();
            }
        })
        this.service.getReportsCompleteData(obj);

    }


    barChart() {

        let that = this;
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Interviewed Type'
            },

            xAxis: {
                categories: ['L1', 'L2']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Slots'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },

            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            credits: {
                enabled: false
            },

            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    },
                    point: {
                        events: {
                            click: function (event) {
                                console.log(event.point.category, event.point.series.userOptions.name)
                                let label = event.point.series.userOptions.name;
                                let category = event.point.category
                                if (label === 'Available') {

                                    if (category === 'L1') that.tabularReport(that.availableArray, 'L1');
                                    else that.tabularReport(that.availableArray, 'L2');
                                }
                                else if (label === 'Booked') {

                                    if (category === 'L1') that.tabularReport(that.bookedArray, 'L1');
                                    else that.tabularReport(that.bookedArray, 'L2');
                                }
                                else if (label === 'Interviewed') {

                                    if (category === 'L1') that.tabularReport(that.interviewedArray, 'L1');
                                    else that.tabularReport(that.interviewedArray, 'L2');
                                }
                                else if (label === 'Not Interviewed') {

                                    if (category === 'L1') that.tabularReport(that.notInterviewedArray, 'L1');
                                    else that.tabularReport(that.notInterviewedArray, 'L2');
                                }


                            }
                        }
                    }
                }
            },

            series: [
                {

                    name: 'Interviewed',
                    data: this.interviewedArray[0].totalCount,

                },
                {
                    name: 'Not Interviewed',
                    data: this.notInterviewedArray[0].totalCount,

                },
                {
                    name: 'Booked',
                    data: this.bookedArray[0].totalCount,

                },
                {
                    name: 'Available',
                    data: this.availableArray[0].totalCount
                }],
        }
    }



    pieChart() {

        let that = this;
        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            responsive: {
                minWidth: 310

            },

            title: {
                text: 'Slot History'
            },
            credits: {
                enabled: false
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },

            series: [
                {
                    name: "Slots",
                    colorByPoint: true,
                    point: {
                        events: {
                            click: function (event) {
                                console.log(event.point.options.name)
                                let label = event.point.options.name;
                                if (label === 'AVAILABLE') {
                                    that.tabularReport(that.availableArray, null);
                                }
                                else if (label === 'BOOKED') {
                                    that.tabularReport(that.bookedArray, null);

                                }
                                else if (label === 'INTERVIEWED') {
                                    that.tabularReport(that.interviewedArray, null);

                                }
                                else if (label === 'NOT INTERVIEWED') {
                                    that.tabularReport(that.notInterviewedArray, null);

                                }
                            }
                        }
                    },
                    data: [
                        {
                            name: "AVAILABLE",
                            y: that.availableArray[0].statusCount,
                            sliced: true,
                            selected: true,
                            color: "#99ff99",

                        },
                        {
                            name: "BOOKED",
                            y: that.bookedArray[0].statusCount,
                            color: '#3171e0',

                        },
                        {
                            name: "INTERVIEWED",
                            y: that.interviewedArray[0].statusCount,
                            color: "#6c757d",

                        },
                        {
                            name: "NOT INTERVIEWED",
                            y: that.notInterviewedArray[0].statusCount,
                            color: "#66ccff",
                        }

                    ]

                }

            ],

        }
    }

    reportsEvent() {
        console.log("inseide reports", this.time);
        if (this.reportEnable) {
            this.reportTableName = 'ALL'
            this.tabularReport(this.completeReportData, null);
        } else {
            this.valueOfButton = "Tabular"
            this.reportEnable = true;
        }
    }




    tabularReport(table, category) {
        this.reportEnable = false;
        this.valueOfButton = "Graphical"

        console.log("in side report table ..", this.reportTableName);
        console.log("table is here ", table);

        if (table.length !== 1) this.reportTableName = 'ALL'
        else this.reportTableName = table[0].status;

        if (table.length !== 0) {
            this.combinedReportsData = []
            for (let i = 0; i < table.length; i++) {
                if (table[i].statusCount !== 0) {
                    for (let j = 0; j < table[i].slotsDTO.length; j++) {
                        let interviewerName, interviewerType;
                        let slotDetails;
                        if (table[i].slotsDTO[j].interviewerType === category) {
                            console.log(table[i].slotsDTO[j].interviewerType, category);
                            interviewerName = table[i].slotsDTO[j].interviewerName;
                            interviewerType = table[i].slotsDTO[j].interviewerType;
                            slotDetails = table[i].slotsDTO[j].slotsDetails;
                        } else {
                            if (table[i].slotsDTO[j].interviewerName !== null && table[i].slotsDTO[j].interviewerType !== null) {
                                interviewerName = table[i].slotsDTO[j].interviewerName;
                                interviewerType = table[i].slotsDTO[j].interviewerType;
                                console.log("Check Interviewer Name", interviewerType)
                            }
                            else {
                                interviewerName = "NA";
                                interviewerType = "NA";
                            }
                            slotDetails = table[i].slotsDTO[j].slotsDetails;
                        }
                        console.log("interviewerName", interviewerName, category);

                        for (let r = 0; r < slotDetails.length; r++) {
                            let from = new Date(slotDetails[r].fromDate).toString().split(" ");
                            let to = new Date(slotDetails[r].toDate).toString().split(" ");
                            let create = new Date(slotDetails[r].creationDate).toString().split(" ");

                            let feedbackComment;

                            if (slotDetails[r].feedbackDetails === null) {
                               this.feedbackStatus = "NA";
                                feedbackComment = "NA";
                            } else {
                                this.feedbackStatus = slotDetails[r].feedbackDetails.feedbackStatus;
                                feedbackComment = slotDetails[r].feedbackDetails.feedbackComment;
                            }
                            let recId, recName, recEmail, download1;
                            if (slotDetails[r].recruiterDetails !== null && slotDetails[r].slotStatus == "INTERVIEWED" && slotDetails[r].isDirectBooked == "N") {
                                let interviewType;
                                if (table[i].slotsDTO[j].interviewerType == 'L1') {
                                    interviewType = "1"
                                }
                                if (table[i].slotsDTO[j].interviewerType == "L2") {
                                    interviewType = "2"
                                }

                                let recCalendarId = slotDetails[r].recruiterDetails.recruiterCalendarId;

                                const a = `<a href='http://3.209.34.157:8080/report/generatePdf?interviewTypeId=${interviewType}&recruiterCalendarId=${recCalendarId} &interviewerCalendarId=0'>Download</a>`;
                                download1 = a;

                                recId = slotDetails[r].recruiterDetails.id;
                                recName = slotDetails[r].recruiterDetails.name;
                                recEmail = slotDetails[r].recruiterDetails.emailId;

                            } else {
                                recId = 'NA';
                                recName = 'NA';
                                recEmail = 'NA';
                                download1 = "NA";
                            }

                            let tech;
                            if (slotDetails[r].isDirectBooked == "N" && slotDetails[r].isBooked == "N") {
                                this.candidateName = "NA";

                            } else {
                                this.candidateName = slotDetails[r].candidateName;
                            }

                            if (slotDetails[r].technology !== null) {
                                tech = slotDetails[r].technology;
                            } else {
                                tech = 'NA';
                            }

                            var object = {
                                "InterviewerName": interviewerName,
                                "InterviewType": interviewerType,
                                "CandidateName": slotDetails[r].candidateName? slotDetails[r].candidateName: 'NA',
                                "FeedbackStatus": feedbackComment,
                                "FromTime": from[4],
                                "ToTime": to[4],
                                "InterviewerEmpId": table[i].slotsDTO[j].interviewerId,
                                "InterviewerEmail": table[i].slotsDTO[j].emailId,
                                "InterviewerGrade": table[i].slotsDTO[j].grade,
                                "InterviewerLocation": table[i].slotsDTO[j].location,
                                "InterviewerSkills": table[i].slotsDTO[j].skills,
                                "InterviewerType": table[i].slotsDTO[j].interviewerType,
                                "ParticipationType": table[i].slotsDTO[j].participationType,
                                "CreationDate": create[0] + " " + create[1] + " " + create[2] + " " + create[3],
                                "BookingDate": from[0] + " " + from[1] + " " + from[2] + " " + from[3],
                                "IsBooked": slotDetails[r].isBooked?slotDetails[r].isBooked: 'NA',
                                "Technology": tech,
                                "RecruiterEmpId": recId,
                                "RecruiterName": recName,
                                "RecruiterEmail": recEmail,
                                "SlotStatus": slotDetails[r].slotStatus,
                                "Account": table[i].slotsDTO[j].account?table[i].slotsDTO[j].account:'NA',
                                "MarkeUnit": table[i].slotsDTO[j].marketUnit?table[i].slotsDTO[j].marketUnit: 'NA',
                                "Organization": table[i].slotsDTO[j].organization?table[i].slotsDTO[j].organization: 'NA',
                                "Download": download1,


                            }
                            this.combinedReportsData.push(object);
                        }
                    }

                }
            }
            console.log('this.combinedReportsData', this.combinedReportsData, this.slotCountArray);
            this.rowData = [];
            this.rowData = this.combinedReportsData.map(data => {
                let object = {};
                for (var propt in data) {
                    object[propt.toLowerCase()] = data[propt]
                }
                return object
            });

            this.columnData = [];
            for (var propt in this.combinedReportsData[0]) {
                this.columnData.push({
                    prop: propt.toLowerCase(),
                    name: propt.toLowerCase(),
                    label: propt.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                });
            }

            console.log('this.slotCountArray', this.columnData);
            this.dataSource = new MatTableDataSource(this.combinedReportsData);
            setTimeout(() => this.dataSource.paginator = this.paginator);
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = this.customFilterPredicate();


            this.SlotStatus.valueChanges.subscribe(val => {
                console.log('value changes', val);
                this.filteredValues['SlotStatus'] = val;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerEmpId.valueChanges.subscribe(val1 => {
                console.log('value changes', val1);
                this.filteredValues['InterviewerEmpId'] = val1;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerName.valueChanges.subscribe(val2 => {
                console.log('value changes', val2);
                this.filteredValues['InterviewerName'] = val2;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerEmail.valueChanges.subscribe(val3 => {
                console.log('value changes', val3);
                this.filteredValues['InterviewerEmail'] = val3;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerGrade.valueChanges.subscribe(val4 => {
                console.log('value changes', val4);
                this.filteredValues['InterviewerGrade'] = val4;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerLocation.valueChanges.subscribe(val5 => {
                console.log('value changes', val5);
                this.filteredValues['InterviewerLocation'] = val5;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewerSkills.valueChanges.subscribe(val6 => {
                console.log('value changes', val6);
                this.filteredValues['InterviewerSkills'] = val6;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.ParticipationType.valueChanges.subscribe(val7 => {
                console.log('value changes', val7);
                this.filteredValues['ParticipationType'] = val7;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.InterviewType.valueChanges.subscribe(val8 => {
                console.log('value changes', val8);
                this.filteredValues['InterviewType'] = val8;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.CreationDate.valueChanges.subscribe(val9 => {
                console.log('value changes', val9);
                this.filteredValues['CreationDate'] = val9;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.BookingDate.valueChanges.subscribe(val10 => {
                console.log('value changes', val10);
                this.filteredValues['BookingDate'] = val10;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.FromTime.valueChanges.subscribe(val11 => {
                console.log('value changes', val11);
                this.filteredValues['FromTime'] = val11;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.ToTime.valueChanges.subscribe(val12 => {
                console.log('value changes', val12);
                this.filteredValues['ToTime'] = val12;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.IsBooked.valueChanges.subscribe(val13 => {
                console.log('value changes', val13);
                this.filteredValues['IsBooked'] = val13;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.Technology.valueChanges.subscribe(val14 => {
                console.log('value changes', val14);
                this.filteredValues['Technology'] = val14;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.CandidateName.valueChanges.subscribe(val15 => {
                console.log('value changes', val15);
                this.filteredValues['CandidateName'] = val15;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.RecruiterEmpId.valueChanges.subscribe(val16 => {
                console.log('value changes', val16);
                this.filteredValues['RecruiterEmpId'] = val16;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.RecruiterName.valueChanges.subscribe(val17 => {
                console.log('value changes', val17);
                this.filteredValues['RecruiterName'] = val17;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.RecruiterEmail.valueChanges.subscribe(val18 => {
                console.log('value changes', val18);
                this.filteredValues['RecruiterEmail'] = val18;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.FeedbackStatus.valueChanges.subscribe(val19 => {
                console.log('value changes', val19);
                this.filteredValues['FeedbackStatus'] = val19;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });

            this.Account.valueChanges.subscribe(val20 => {
                console.log('value changes', val20);
                this.filteredValues['Account'] = val20;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.MarkeUnit.valueChanges.subscribe(val21 => {
                console.log('value changes', val21);
                this.filteredValues['MarkeUnit'] = val21;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });
            this.Organization.valueChanges.subscribe(val22 => {
                console.log('value changes', val22);
                this.filteredValues['Organization'] = val22;
                this.dataSource.filter = JSON.stringify(this.filteredValues);
                console.log(JSON.stringify(this.filteredValues))
            });

        }

    }

    customFilterPredicate() {
        const myFilterPredicate = (data: slotDetailsValue, filter: string):
            boolean => {
            let searchString = JSON.parse(filter);
            console.log('search string', searchString, data);
            return data.SlotStatus.toString().trim().toLowerCase().indexOf(searchString.SlotStatus.toLowerCase()) !== -1
                && data.InterviewerEmpId.toString().trim().toLowerCase().indexOf(searchString.InterviewerEmpId.toLowerCase()) !== -1
                && data.InterviewerName.toString().trim().toLowerCase().indexOf(searchString.InterviewerName.toLowerCase()) !== -1
                && data.InterviewerEmail.toString().trim().toLowerCase().indexOf(searchString.InterviewerEmail.toLowerCase()) !== -1
                && data.InterviewerGrade.toString().trim().toLowerCase().indexOf(searchString.InterviewerGrade.toLowerCase()) !== -1
                && data.InterviewerLocation.toString().trim().toLowerCase().indexOf(searchString.InterviewerLocation.toLowerCase()) !== -1
                && data.InterviewerSkills.toString().trim().toLowerCase().indexOf(searchString.InterviewerSkills.toLowerCase()) !== -1
                && data.ParticipationType.toString().trim().toLowerCase().indexOf(searchString.ParticipationType.toLowerCase()) !== -1
                && data.InterviewType.toString().trim().toLowerCase().indexOf(searchString.InterviewType.toLowerCase()) !== -1
                && data.CreationDate.toString().trim().toLowerCase().indexOf(searchString.CreationDate.toLowerCase()) !== -1
                && data.BookingDate.toString().trim().toLowerCase().indexOf(searchString.BookingDate.toLowerCase()) !== -1
                && data.FromTime.toString().trim().toLowerCase().indexOf(searchString.FromTime.toLowerCase()) !== -1
                && data.ToTime.toString().trim().toLowerCase().indexOf(searchString.ToTime.toLowerCase()) !== -1
                && data.IsBooked.toString().trim().toLowerCase().indexOf(searchString.IsBooked.toLowerCase()) !== -1
                && data.Technology.toString().trim().toLowerCase().indexOf(searchString.Technology.toLowerCase()) !== -1
                && data.CandidateName.toString().trim().toLowerCase().indexOf(searchString.CandidateName.toLowerCase()) !== -1
                && data.RecruiterEmpId.toString().trim().toLowerCase().indexOf(searchString.RecruiterEmpId.toLowerCase()) !== -1
                && data.RecruiterName.toString().trim().toLowerCase().indexOf(searchString.RecruiterName.toLowerCase()) !== -1
                && data.RecruiterEmail.toString().trim().toLowerCase().indexOf(searchString.RecruiterEmail.toLowerCase()) !== -1
                // && data.FeedbackStatus.toString().trim().toLowerCase().indexOf(searchString.FeedbackStatus.toLowerCase()) !== -1
                && data.MarkeUnit.toString().trim().toLowerCase().indexOf(searchString.MarkeUnit.toLowerCase()) !== -1
                && data.Organization.toString().trim().toLowerCase().indexOf(searchString.Organization.toLowerCase()) !== -1;

        }
        return myFilterPredicate;
    }
    showFilterpage() {
        this.mobileFilter = true;
    }
    gotoFilterPage() {
        console.log("Hello i m here filter", this.mobileView)
        this.mobileView = !this.mobileView;
        // this.router.navigate(["/reportfilter"]);
        // this.router.navigate(["/report-mobile-filter"]);
    }
    gotoReportPage() {
        this.mobileView = false;
    }

    techCheckbox(click) {
        console.log(click);
        console.log(this.accountId, this.dateTimeRange);
        this.showTmpl1 = !this.showTmpl1;
        if (click.checked) {
            this.techCheckboxValue = "Disable"
            this.checkboxDisabled = false;
        } else {
            this.techCheckboxValue = "Enable"
            this.checkboxDisabled = true;
            this.selectedTechnology = undefined;
            this.reportsFunction();
        }
    }
    orgCheckbox(click) {
        console.log(click);
        this.showTmpl2 = !this.showTmpl2;
        if (click.checked) {
            this.orgCheckboxValue = "Disable"
            this.checkboxDisabledOrg = false;

        } else {
            this.orgCheckboxValue = "Enable"
            this.checkboxDisabledOrg = true;
            this.selectedOrg = undefined;
            this.selectedMarketUnitValue = undefined;
            this.accountId = undefined;
            this.reportsFunction();
            this.marketUnitDisabled = true;
            this.marketUnitArray = undefined;
            this.accountsArray = undefined;
            this.selectAccoutnDisabled = true;


        }
    }

    selectedAccount(account) {
        if (account.length > 0) {
            this.backAccColor = "#A9A9A9";
        }
        this.accountId = account;
        console.log('hello', account);
        this.reportsFunction();

    }

    seletedTechValue(techValue) {
        console.log(techValue);
        if (techValue.length > 0) {
            this.backTechColor = "#A9A9A9";
        }
        this.reportsFunction();
    }
    seletedDayValue(dayValue) {
        if (dayValue.length > 0) {
            this.backdayColor = "#A9A9A9";
        }
        console.log("day value ", dayValue);
        this.reportsFunction();

    }

    selectedOrganization(org) {
        if (org.length > 0) {
            this.backOrgColor = "#A9A9A9";
        }
        this.service.getMarketUnitByBu(org).subscribe(res => {
            console.log("res", res);
            let arr = [];
            arr.push(res);
            this.marketUnitArray = arr[0];

        })
        if (org > 0) {
            this.marketUnitDisabled = false;
        }

        this.accountId = undefined;
        this.selectedMarketUnitValue = undefined;
    }

    selectedMarketUnit(mu) {
        if (mu.length > 0) {
            this.backAccColor = "#A9A9A9";
        }
        let muArr = [];
        muArr.push(mu)
        
        this.service.getAccountByMu({ muId: muArr }).subscribe(res => {
            let arr = [], accArr = [];
            arr.push(res);
            this.accountsArray = arr[0];
            this.accountsArray.forEach(acc => {
                accArr.push(acc.id);
            });
            this.accountId = accArr;

            console.log("account arr", this.accountId);
            this.reportsFunction();
        })
        if (mu > 0) {
            this.selectAccoutnDisabled = false;
        }
    }
    getDateRange(event?) {
        if (this.dateRangeArr.length > 0) {
            this.backdayColor = "#A9A9A9";
        }
        console.log(event.value[0].getTime());
        console.log(event.value[1].getTime());
        this.dateRangeArr = event.value;
        this.reportsFunction();
    }


    downloadCompleteReports() {
        console.log('download', this.reportTableName);
        console.log('tech', this.selectedTechnology);
        let start, end;
        if (this.dateRangeArr.length > 0) {
            start = new Date(this.dateRangeArr[0]).getTime();
            end = new Date(this.dateRangeArr[1]).getTime();
        } else {
            start = new Date().setMonth(new Date().getMonth() - 1);
            end = new Date().getTime();
        }

        let downloadId;

        if (this.reportTableName === 'ALL') {
            downloadId = 0;
        } else if (this.reportTableName === 'BOOKED') {
            downloadId = 2;
        } else if (this.reportTableName === 'INTERVIEWED') {
            downloadId = 3;
        } else if (this.reportTableName === 'NOT INTERVIEWED') {
            downloadId = 4;
        } else if (this.reportTableName === 'AVAILABLE') {
            downloadId = 1;
        }
        this.service.downloadReport(start, end, this.selectedTechnology ? this.selectedTechnology : [], downloadId,
            this.selectedDay, this.selectedOrg ? this.selectedOrg : 0, this.accountId ? this.accountId : 0);

    }


    filterMyOptions(value) {
        let filterTech = this.technologyArrayReplica.filter(tech => {
            return tech.name.toLowerCase().includes(value.toLowerCase());
        });

        if (value !== '') this.technologyArray = filterTech;
        else this.technologyArray = this.technologyArrayReplica;
    }

    OnClear() {
        let click = false;
        this.orgCheckbox(click);
        this.toggleOrgChange = false;
        this.toggleTechChange = false;
        this.techCheckbox(click);
        let currentDate = [new Date().setMonth(new Date().getMonth() - 1), new Date().getTime()];
        let dateTimeRangeStart = new Date(currentDate[0]);
        let dateTimeRangeEnd = new Date(currentDate[1]);
        this.dateTimeRange = [dateTimeRangeStart, dateTimeRangeEnd]
    }

}



export interface slotDetailsValue {
    InterviewerName: string,
    InterviewerEmpId: string,
    InterviewerEmail: string,
    InterviewerGrade: string,
    InterviewerLocation: string,
    InterviewerSkills: string,
    ParticipationType: string,
    InterviewType: string,
    CreationDate: string,
    BookingDate: string,
    FromTime: string,
    ToTime: string,
    IsBooked: string,
    Technology: string,
    CandidateName: string,
    RecruiterEmpId: string,
    RecruiterName: string,
    RecruiterEmail: string,
    FeedbackStatus: string,
    MarkeUnit: string,
    Organization: string,
    SlotStatus: string,
}

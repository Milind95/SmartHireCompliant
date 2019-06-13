import { EventColor, EventAction } from 'calendar-utils';

export interface BookingEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title?: string;
    color?: EventColor;
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;

    candidateName?: string;
    technology?: string;
    interviewType?: string;
    interviewerName?: string;
    interviewerEmpId?: string | number;
    interviewerEmail?: string;
    interviewerGrade?: string;
    interviewerLocation?: string;
    interviewerSkills?: string;
    participationType?: string;
    isBooked?: boolean;
    bookingDate?: Date;
    fromTime?: Date;
    toTime?: Date;
    slotStatus?: string;
    recruiterName?: string;
    recruiterEmpId?: string | number;
    recruiterEmail?: string;
    organization?: string;
    marketUnit?: string;
    account?: string;
    comments?: string;
    calendarId?: number;
    feedbackStatus?: string;
    availableCount?: number,
    bookedCount?: number,
    interviewedCount?: number,
    interviewerAvailabilityCount?: number,
    isDeleteSelect?: boolean
}


export interface LookupEvent<MetaType = any> {
    name?: string | number;
    id?: string | number;
}
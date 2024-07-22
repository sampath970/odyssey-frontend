"use client";
import React from "react";
import moment from "moment";
import "./meetings.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

interface MeetingEvent {
  start: Date;
  end: Date;
  title: string;
}

const events: MeetingEvent[] = [
  {
    start: moment("2023-03-18T10:00:00").toDate(),
    end: moment("2023-03-18T11:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appointment",
  },
];

const Meetings: React.FC = () => {
  return (
    <div className="meetings">
      <Calendar events={events} localizer={localizer} defaultView={"day"} />
    </div>
  );
};

export default Meetings;

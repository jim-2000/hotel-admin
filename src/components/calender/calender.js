import React, { useRef } from 'react'
import { useCallback, useState } from "react";
import  { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from 'react-redux';
import Calendertoolbar from './calendertoolbar';
import CalendarEventWrapper from './CalendarEventWrapper';
const localizer = momentLocalizer(moment);

const Hotelalender = () => {
  const [open, setOpen] = React.useState(false);
  const clickRef = useRef(null)
  
  const {Booking,CencellBooking,pendingBooking} = useSelector((state)=>state.book)
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSelectSlot = useCallback(
     ()=>console.log('slot'),
    []
  );
 //RENDER SINGLE EVENT POPUP CONTENT
 const  renderEventContent = (event) => {
  const date = moment(event.checkIn).format('MMMM D, YYYY');
  return (
      <div>
          <p>Date: <strong>{event.checkIn}</strong></p>
          <p>Location: {event.username}</p>
      </div>
  );
}

 

//EVENT STYLE GETTER FOR SLYLING AN EVENT ITEM
const  eventStyleGetter = (item, start, end, isSelected) =>{
let current_time = moment().format('YYYY MM DD');
let event_time = moment(item.checkIn).format('YYYY MM DD');
let background = (current_time>event_time) ? '#DE6987' : '#8CBD4C';
return {
    style: {
        backgroundColor: background,
        height: isSelected? 'block' : '',

    }
};
}
    
 
  return (
    <div className='bg-gray-300 p-2 shadow-md'>
      <Calendar
        components={{
          toolbar:Calendertoolbar,
          eventWrapper:CalendarEventWrapper,

        }}     
        showAllEvents={true}
        showMultiDayTimes={true}
        enableAutoScroll={true}
        allDayAccessor={'conFirmBook'}
        localizer={localizer}
        events={Booking}
        onSelectSlot={handleSelectSlot}
        startAccessor="checkIn"
        endAccessor="checkOut"
        children="username"
        style={{ height: "100vh" }}
        views={["month", "week", "day"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable={true}
        // eventPropGetter={(eventStyleGetter)}
      />
    </div>
  )
}
 

export default Hotelalender



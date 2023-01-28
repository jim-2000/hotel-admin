import React from 'react'
import Iconify from '../iconify/Iconify';
import { format, getTime, formatDistanceToNow } from 'date-fns';

const CalendarEventWrapper = ({event}) => {
  // console.log(event);
  return (
    <div className={`h-full w-full ${event.isCarNeed ? 'bg-orange-500' : 'bg-teal-500'} p-3  flex flex-col md:flex-row justify-between border-r-2 border-green-500 shadow hover:shadow-lg  overflow-visible`}>
       <div className='flex flex-col'>
        <p className='font-bold' >{event.roomNumber}</p>
        <small className='text-white text-[10px]'>{format(new Date(event.checkIn),'EEE-dd-MM')}</small>
        <small className='text-white text-[10px]'>{format(new Date(event.checkOut),'EEE-dd-MM')}</small>
       </div>
        <div className='flex flex-col text-gray-300'>
          <small>{event.userName}</small>
          <small>{event.phone}</small>
        </div>
        <div className='flex flex-col text-gray-300'>
          <small>{event.userName}</small>
          <small>{event.sortId}</small>
        </div>
       
    </div>
  )
}

export default CalendarEventWrapper
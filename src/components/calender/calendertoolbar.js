import React from 'react'
import Iconify from '../iconify/Iconify';

const Calendertoolbar = (toolbar) => {

// this.toolbarDate = toolbar.date;
const goToDayView = () => {
toolbar.onView('day');
}
const goToWeekView = () => {
toolbar.onView('week');
}
const goToMonthView = () => {
toolbar.onView('month');
    setTimeout(() => {
        setOffRangeDateStyle();
      }, 100)
    
    }
const goToBack = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() - 1,
        1);
      toolbar.onNavigate('prev', newDate);
    //   getCalendarEvents(newDate);
    
    }
const goToNext = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() + 1,
        1);
      toolbar.onNavigate('next', newDate);
    //   getCalendarEvents(newDate);
    
    }

  return (
    <div className="rbc-toolbar">
    <span className="rbc-btn-group bg-sky-500 rounded">
        <button type="button" className="btn btn-control" onClick={goToBack}>
            <Iconify icon={'material-symbols:arrow-circle-left-outline'} color={"teal"} size={30} /> <span>Prev</span>
        </button>
    </span>
    <span className="rbc-btn-group  bg-green-500 rounded">
        <button type="button" className="btn btn-control" onClick={goToNext}>Next  <Iconify icon={'material-symbols:arrow-circle-right-outline-rounded'} size={30} /></button>
    </span>
    <span className="rbc-toolbar-label text-2xl text-orange-500 font-bold">{toolbar.label}</span>
    <span className="rbc-btn-group">
        <button type="button" className="btn btn-control" onClick={goToDayView}>Day</button>
    </span>
    <span className="rbc-btn-group">
        <button type="button" className="btn btn-past" onClick={goToWeekView}>WEEK</button>
    </span>
    <span className="rbc-btn-group">
        <button type="button" className="btn btn-upcoming" onClick={goToMonthView}>MonTH</button>
    </span>
</div>

  )
}

export default Calendertoolbar

//     <div className="flex justify-between items-center">
//     <div className="flex-1 justify-between items-center">
//       <button className="btn btn-back" onClick={goToBack}>
//          <Iconify icon={'material-symbols:arrow-circle-left-outline'} />    
//       </button>
//       <button className="btn btn-next" onClick={goToNext}>
//       <Iconify icon={'material-symbols:arrow-circle-right-outline-rounded'} size={30} />    
//       </button>
//       <label className='rbc-toolbar-label'>{toolbar.label}</label>
//     </div>
//     <div className="flex justify-between items-center">
//       <button className="bg-filter-off" onClick={goToDayView}><Iconify icon={'bi:calendar-day-fill'} size={30} /></button>
//       <button className="bg-filter-off" onClick={goToWeekView}><span className="label-filter-off">Week</span></button>
//       <button className="bg-filter-off" onClick={goToMonthView}><span className="label-filter-off">Month</span></button>
//     </div>
//   </div >
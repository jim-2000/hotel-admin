import React from 'react'
import { Avatar, Button, Card, Grid, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppWidgetSummary } from '../sections/@dashboard/app'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getAllHotels } from '../redux/slice/hotelSlice'
import { toast } from 'react-hot-toast'
import HotelCard from '../sections/@dashboard/hotel/hotelCard'
import Iconify from '../components/iconify/Iconify'
import { ConfirmBooked, RemoveBooked, getAllBookings } from '../redux/slice/bookinSlice'
import { StripeConfig } from '../redux/api'
import { format } from 'date-fns'

const BookingPage = () => {
  const {myhotel,hotels} = useSelector((state)=>state.hotel)
  const {Booking,CencellBooking,pendingBooking} = useSelector((state)=>state.book)

  const dispatch = useDispatch()

  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(getAllBookings(toast))
  },[])

  return (
    <>
      <Helmet>
        <title>Booking | Hotel luner </title>
      </Helmet>
      <div className='container'>
        <div className='flex py-2 justify-between items-center'>
            <div>
              <h2 className='text-gray-600 font-bold'>{myhotel.name}</h2>
              <p className='text-gray-400'>{myhotel.address}</p>
            </div>
            <div className='flex'>
            <Button variant="outlined" startIcon={<Iconify icon="simple-line-icons:calender" color="teal" /> }
            color='success'
              onClick={()=>{
                navigate('/dashboard/check-calender')
              }}
              >
              Check calender
            </Button>
            <div className='w-1 h-1' />
            <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={()=>{
                navigate('/dashboard/createbooking')
              }}
              >
              Book Now
            </Button>
            </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Bookings" 
            total={Booking && Booking.length} color="success" icon={'ant-design:home-filled'}          
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="New Booking Requese" total={pendingBooking && pendingBooking.length } color="warning" icon={'material-symbols:supervised-user-circle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Cencell Booking" total={CencellBooking && CencellBooking.length} color="error" icon={'material-symbols:supervised-user-circle'} />
          </Grid>
        </Grid>
        <div className='py-2 md:py-2 '>
           <Typography variant="h4" color={"red"}>
            Cencell Booking
            </Typography>
            
            <div className={`${CencellBooking.length > 0 ? `h-[500px]` : 'h-20'} overflow-y-scroll`}>
              {
              CencellBooking.length > 0 ? CencellBooking.map((n, i) =><CencellBooking key={i} />) : (
                <div className='flex items-center justify-center'>
                  <p className='text-gray-300'>No Booking are cencelled</p>
                </div>
              )
              }
            </div>
        </div>
        <div className='py-2 md:py-5'>
          <Typography variant='h4'>
              New Booking Request
          </Typography>
          <div className={`${pendingBooking.length > 0 ? `h-fit my-2` : 'h-20'} overflow-y-scroll`}>
              {
              pendingBooking.length > 0 ? pendingBooking.map((book, i) =><PendingBooking key={i} booked={book} />) : (
                <div className='flex items-center justify-center'>
                  <p className='text-gray-300'>No new Booking</p>
                </div>
              )
              }
          </div>
        </div>
        <div className='py-2 md:py-5'>
          <Typography variant='h4'>
              All Booking
          </Typography>
          <div className={`${Booking.length > 0 ? `h-full` : 'h-20'} overflow-y-scroll`}>
              {
              Booking && Booking.length > 0 ? Booking.map((book, i) =><AllBooking key={book._id} booked={book} />) : (
                <div className='flex items-center justify-center'>
                  <p className='text-gray-300'>Booking list is empty </p>
                </div>
              )
              }
          </div>
        </div>
      </div>
    </>
  )
}
export default BookingPage



const IconContainer = ({ icon, text, Fun=()=>{},...props}) => {
  return (
    <Button variant="outlined" startIcon={icon}
    onClick={Fun}
    props
    >
   {text}
  </Button>
  );
}


export const PendingBooking = ({booked})=>{
  const sdate = new Date(booked.checkIn)
  const edate = new Date(booked.checkOut)
  const start = format(sdate, 'EEE-dd-MM-yyyy')
  const end = format(edate, 'EEE-dd-MM-yyyy')
  const create = format(new Date(booked.createdAt), 'EEE-dd-MM-yyyy')
  const dispatch = useDispatch()
// flex flex-col justify-between md:flex-row 
  return (
    <>
    <div className={`
      flex flex-col items-start justify-between md:flex-row  shadow 
      border-2 border-orange-500 rounded-md md:border-gray-200  px-2 py-4  m-1
      ${booked.IsOnlinepaid ? 'bg-gray-300' : 'bg-teal-300'}
      hover:shadow-md
      relative
    `}>
              
      <div className='space-y-1 px-2 '>   
            <h3 className='text-base font-semibold truncate'>{booked.userName}</h3>
            <p className='font-semibold text-gray-600 text-sm truncate no-underline cursor-copy'
            onClick={()=>{
            }}
            >ID 
              <span className='font-bold text-black underline'> {booked.sortId} </span>
            </p> 
            <p className='text-gray-400'>{booked.createdAt }</p>
            <p className='text-gray-400 truncate'>{booked.phone}</p>
            <p className='text-gray-400 truncate'>{booked.email}</p>
            <p className='text-gray-600 font-bold truncate'>{booked.isCarNeed ? 'Need a car' : ''}</p>
      </div>
      <div className='space-y-2 px-2 border-t-2 border-gray-300 md:border-none my-2 md:my-0'>
        <div className='flex ' >
        <h5>Payment Method </h5>       
        {
          booked.paymentId === 'cash' ?  <Iconify icon="mdi:account-cash" color="teal" />  : <Iconify icon="logos:stripe" color="blue" size={30} /> 
        }      
        </div>
        <div className={`flex  text-sm md:text-[12px]`} >
        <h5>Payment ID - </h5>
        <Iconify icon="mdi:tick-circle" color="green" /> 
        <p className='font-semibold text-gray-600 text-sm'>  {
          booked.paymentId === 'cash' ?  "cash on Book" : `${booked.paymentId}`
        }</p>                
        </div>
        <div className='flex items-center' >
        <h5>Balance - </h5>
        <p></p>
        <Iconify icon="ph:currency-circle-dollar-bold" color="green" /> 
        <p className='font-bold text-gray-600'> {booked.totalAmount}</p>                
        </div>
        <div className='flex flex-wrap' >
        <h5>Room No - </h5>
        <Iconify icon="ic:baseline-bookmark-added" color="teal" /> 
        <p className='font-bold text-gray-600'>{booked.roomNumber}</p>             
        </div>
   
      </div>
      <div className='space-y-1 px-2 my-2 md:my-0'>
        <div className='flex flex-wrap' >
        <h5>Check IN - </h5>
        <Iconify icon="mdi:tick-circle" color="green" /> 
        <p className='font-bold text-gray-600'>{start}</p>             
        </div>
        <div className='flex flex-wrap' >
        <h5>Check OUT - </h5>
        <Iconify icon="gridicons:cross-circle" color="red" /> 
        <p className='font-bold text-gray-600'>{end}</p>                        
        </div>
        <div className='flex flex-wrap' >
        <h5>Total Night - </h5>
        <Iconify icon="simple-line-icons:calender" color="red" /> 
        <p className='font-bold text-gray-600'>{booked.totalNight} night</p>             
        </div>
        
      </div> 

     {/* action part  */}
    <div className=' absolute py-1  right-0 bottom-0 flex  justify-evenly my-2 md:my-0'>
      <IconButton
      className='bg-teal-600'
      onClick={()=>{
        dispatch(ConfirmBooked({id:booked._id,toast}))
      }}
      >
        <Iconify icon="mdi:tick-circle"  color="green" />
      </IconButton>
      <div className='w-1' />
      <IconButton
      className='bg-orange-300'
      onClick={()=>{
        dispatch(RemoveBooked({id:booked._id,toast}))
      }}
      >
        <Iconify icon="eva:trash-2-fill" color="red"  />
      </IconButton>
      
    </div>
  </div>
  </>
  )
}
export const CencellBooking = ()=>{
  
  return (
    <div className='flex flex-col justify-between md:flex-row shadow-lg border-2 border-gray-400 md:border-gray-200 rounded p-2 m-1 '>
              
    <div className='flex flex-col  md:flex-row   space-y-1 px-2'>
        <img
            alt="Remy Sharp"
            src="https://via.placeholder.com/150"
            className='rounded-full w-24 h-24 '
            style={{ marginLeft:'auto',marginRight:'auto',marginBottom:'auto',marginTop:'auto'}}
          />
       <div className='mx-auto px-1'>
          <h3 className='text-base font-semibold'>Mr. John Doe</h3>
          <p className='font-bold text-gray-600 text-sm truncate'> Delux Room</p> 
          <p className='text-gray-400'>March 24 2022 </p>
          <p className='text-gray-400'>+880 199006622</p>
          <p className='text-gray-400'>john@doe.com</p>
       </div>
    </div>
    <div className='space-y-2 px-2 border-t-2 border-gray-300 md:border-none my-2 md:my-0'>
      <div className='flex ' >
       <h5>Payment Method - </h5>
       <Iconify icon="logos:paypal" color="blue" /> 
       {/* <Iconify icon="uim:master-card" color="orange" /> 
       <Iconify icon="mdi:account-cash" color="red" />  
       <Iconify icon="mdi:tick-circle" color="green" /> 
       */}
      </div>
      <div className='flex' >
       <h5>Payment ID - </h5>
       <Iconify icon="mdi:tick-circle" color="green" /> 
       <p className='font-bold text-gray-600'> 38F2C9A29Z</p>                
      </div>
      <div className='flex items-center' >
       <h5>Balance - </h5>
       <p></p>
       <Iconify icon="ph:currency-circle-dollar-bold" color="green" /> 
       <p className='font-bold text-gray-600'> 40</p>                
      </div>
      <div className='flex items-center' >
       <h5>Room ID - </h5>
       <p></p>
       <Iconify icon="teenyicons:face-id-solid" color="green" /> 
       <p className='font-bold text-gray-600'> 38F2C9A29Z</p>                
      </div>
    </div>
    <div className='space-y-1 px-2 my-2 md:my-0'>
      <div className='flex flex-wrap' >
       <h5>Check IN - </h5>
       <Iconify icon="mdi:tick-circle" color="green" /> 
       <p className='font-bold text-gray-600'> Wed 3 March 2022</p>             
      </div>
      <div className='flex flex-wrap' >
       <h5>Check OUT - </h5>
       <Iconify icon="gridicons:cross-circle" color="red" /> 
       <p className='font-bold text-gray-600'> Wed 5 March 2022</p>             
      </div>
      <div className='flex flex-wrap' >
       <h5>Total Night - </h5>
       <Iconify icon="simple-line-icons:calender" color="red" /> 
       <p className='font-bold text-gray-600'> 2 night 3 day</p>             
      </div>
      <div className='flex flex-wrap' >
       <h5>Room No - </h5>
       <Iconify icon="ic:baseline-bookmark-added" color="teal" /> 
       <p className='font-bold text-gray-600'> 509</p>             
      </div>
    </div>
    <div className='flex flex-col  justify-evenly my-2 md:my-0'>
      <IconContainer icon={<Iconify icon="mdi:tick-circle"  color="green" />  } text='Confirm'  />
      <div  className='h-5 md:h-0' />
      <IconContainer icon={<Iconify icon="eva:trash-2-fill" color="red"  /> } text='Delete' />
      {/* <IconContainer icon={<Iconify icon="eva:trash-2-fill"  /> } text='Delete'  /> */}
    </div>
  </div>
  )
}


export const AllBooking = ({booked})=>{
  const sdate = new Date(booked.checkIn)
  const edate = new Date(booked.checkOut)
  const start = format(sdate, 'EEE-dd-MM-yyyy')
  const end = format(edate, 'EEE-dd-MM-yyyy')
  const create = format(new Date(booked.createdAt), 'EEE-dd-MM-yyyy')
  
  const dispatch = useDispatch()
  return (
    <>
      <div className={`flex flex-col justify-between md:flex-row shadow 
      border-2 border-black rounded-md md:border-gray-200  p-2 m-1
      ${booked.IsOnlinepaid ? 'bg-gray-300' : 'bg-sky-300'}
      hover:shadow-md
      relative
      `}>
                
      <div className='flex flex-col flex-wrap md:flex-row   space-y-1 px-2'>
          {/* <img
              alt="Remy Sharp"
              src={booked.img}
              className='rounded-full w-24 h-24 '
              style={{ marginLeft:'auto',marginRight:'auto',marginBottom:'auto',marginTop:'auto'}}
            /> */}
        <div className=' md:mx-auto px-1'>
            <h3 className='text-base font-semibold truncate'>{booked.userName}</h3>
            <p className='font-semibold text-gray-600 text-sm truncate no-underline cursor-copy'
            onClick={()=>{
            }}
            >ID 
              <span className='font-bold text-black underline'> {booked.sortId} </span>
            </p> 
            <p className='text-gray-400'>{create }</p>
            <p className='text-gray-400 truncate'>{booked.phone}</p>
            <p className='text-gray-400 truncate'>{booked.email}</p>
            <p className='text-gray-600 font-bold truncate'>{booked.isCarNeed ? 'Need a car' : ''}</p>
        </div>
      </div>
      <div className='space-y-2 px-2 border-t-2 border-gray-300 md:border-none my-2 md:my-0'>
        <div className='flex ' >
        <h5>Payment Method </h5>
        
        {
          booked.paymentId === 'cash' ?  <Iconify icon="mdi:account-cash" color="teal" />  : <Iconify icon="logos:stripe" color="blue" size={30} /> 
        }
        
    
        </div>
        <div className={`flex  text-sm md:text-[12px]`} >
        <h5>Payment ID - </h5>
        <Iconify icon="mdi:tick-circle" color="green" /> 
        <p className='font-semibold text-gray-600 text-sm'>  {
          booked.paymentId === 'cash' ?  "cash on Book" : `${booked.paymentId}`
        }</p>                
        </div>
        <div className='flex items-center' >
        <h5>Balance - </h5>
        <p></p>
        <Iconify icon="ph:currency-circle-dollar-bold" color="green" /> 
        <p className='font-bold text-gray-600'> {booked.totalAmount}</p>                
        </div>
        <div className='flex ' >
        <h5>Room ID - </h5>
        <p></p>
        <Iconify icon="teenyicons:face-id-solid" color="green" /> 
        <p className='text-sm md:text-[12px] text-gray-600'> {booked.roomId}</p>                
        </div>
      </div>
      <div className='space-y-1 px-2 my-2 md:my-0'>
        <div className='flex flex-wrap' >
        <h5>Check IN - </h5>
        <Iconify icon="mdi:tick-circle" color="green" /> 
        <p className='font-bold text-gray-600'>{start}</p>             
        </div>
        <div className='flex flex-wrap' >
        <h5>Check OUT - </h5>
        <Iconify icon="gridicons:cross-circle" color="red" /> 
        <p className='font-bold text-gray-600'>{end}</p>                        
        </div>
        <div className='flex flex-wrap' >
        <h5>Total Night - </h5>
        <Iconify icon="simple-line-icons:calender" color="red" /> 
        <p className='font-bold text-gray-600'>{booked.totalNight} night</p>             
        </div>
        <div className='flex flex-wrap' >
        <h5>Room No - </h5>
        <Iconify icon="ic:baseline-bookmark-added" color="teal" /> 
        <p className='font-bold text-gray-600'>{booked.roomNumber}</p>             
        </div>
      </div> 
      <div className='absolute cursor-pointer right-1 bottom-1 w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-slate-400 hover:shadow-md'
      onClick={()=>{
        dispatch(RemoveBooked({id:booked._id,toast}))
      }}
      >
        <Iconify icon="eva:trash-2-fill" color="#a12" />
      </div>
    </div>
    </>
  )
}
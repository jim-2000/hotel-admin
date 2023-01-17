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
import { getAllBookings } from '../redux/slice/bookinSlice'
import { StripeConfig } from '../redux/api'

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
            <div>
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
            total={1200} color="success" icon={'ant-design:home-filled'}          
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Cencell Booking" total={25} color="error" icon={'material-symbols:supervised-user-circle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Available Room" total={1352830001} color="info" icon={'material-symbols:supervised-user-circle'} />
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
          <div className={`${pendingBooking.length > 0 ? `h-[500px]` : 'h-20'} overflow-y-scroll`}>
              {
              pendingBooking.length > 0 ? pendingBooking.map((n, i) =><PendingBooking key={i} />) : (
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
          <div className={`${Booking.length > 0 ? `h-[500px]` : 'h-20'} overflow-y-scroll`}>
              {
              Booking.length > 0 ? Booking.map((n, i) =><AllBooking key={i} />) : (
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



const IconContainer = ({ icon, text,...props}) => {
  return (
    <Button variant="outlined" startIcon={icon}
    onClick={()=>{
      
    }}
    props
    >
   {text}
  </Button>
  );
}


export const PendingBooking = ()=>{
  return (
    <div className='flex flex-col justify-between md:flex-row shadow-lg border-2 border-gray-400 md:border-gray-200 rounded p-2 m-1 '>
              
    <div className='flex flex-col flex-wrap md:flex-row   space-y-1 px-2'>
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
export const CencellBooking = ()=>{
  return (
    <div className='flex flex-col justify-between md:flex-row shadow-lg border-2 border-gray-400 md:border-gray-200 rounded p-2 m-1 '>
              
    <div className='flex flex-col flex-wrap md:flex-row   space-y-1 px-2'>
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
export const AllBooking = ()=>{
  return (
    <div className='flex flex-col justify-between md:flex-row shadow-lg border-2 border-gray-400 md:border-gray-200 rounded p-2 m-1 '>
              
    <div className='flex flex-col flex-wrap md:flex-row   space-y-1 px-2'>
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
  </div>
  )
}
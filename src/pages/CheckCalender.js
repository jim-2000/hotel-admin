import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { format } from 'date-fns'
import Hotelalender from '../components/calender/calender'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import Iconify from '../components/iconify/Iconify'
import { getAllBookings } from '../redux/slice/bookinSlice'
 

const CheckCalender = () => {
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
              <h2 className='text-teal-600 font-bold'>Hotel Luner</h2>
              <p className='text-sky-600'>{format(new Date(),'EEE-dd-MM-yyyy')}</p>
            </div>
           <>
           <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={()=>{
                navigate('/dashboard/createbooking')
              }}
              >
              Book Now
            </Button>
           </>
        </div>
        <Hotelalender />
    </div>
    </>
  )
}

export default CheckCalender
import React, { useState } from 'react'
import { Avatar, Box, Button, Card, Grid, IconButton, Paper, StepLabel, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppWidgetSummary } from '../sections/@dashboard/app'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getAllHotels } from '../redux/slice/hotelSlice'
import { toast } from 'react-hot-toast'
import HotelCard from '../sections/@dashboard/hotel/hotelCard'
import Iconify from '../components/iconify/Iconify'
import { useBookForm } from '../context/bookContext'
import { SimpleInput } from '../components/form/simpleInput'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import UserDetailsForm from '../components/form/book/userDetailsForm'
import BookRoomSeelect from '../components/form/book/bookRoomSeelect'
import { Allroom } from '../redux/slice/roomSlice'
import BookPaymentDetails from '../components/form/book/bookPaymentDetails'
import { BookNow } from '../redux/slice/bookinSlice'
import { StripeConfig } from '../redux/api'

const CreateBooking = () => {
  const [stripePromice, setStripePromice] = useState(null)

  const [activeStep, setActiveStep] = React.useState(0);

  const {rooms} = useSelector((state)=>state.room)

  const {bookForm,resetBookForm} = useBookForm()

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

 const steps =[
   {
     title: 'User Details',
     content: <UserDetailsForm />
   },
   {
    title: 'Room Details',
    content: <BookRoomSeelect />
   },
   {
    title: 'Payment Confirmation',
    content: <BookPaymentDetails />
  },
 ]

 React.useEffect(()=>{
  dispatch(Allroom(toast));
 
 },[])
 
  return (
    <>
      <Helmet>
        <title>Book | Hotel luner</title>
      </Helmet>
      <div className='container'>
    
        {/* <form onSubmit={(e)=>{
          e.preventDefault(); 
          console.log(bookForm);
        }}     

        >
            <UserDetailsForm />
          <BookRoomSeelect />
          <BookPaymentDetails />
          <Button type='submit' variant='outlined'>SUMBIT</Button>
        </form> */}

          <Stepper activeStep={activeStep} orientation="vertical">
            {
            steps.map((step, index) => (
                <Step
                expanded={true}
                >
                  <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.title}
                  </StepLabel>
                  {step.content}
                  <Box sx={{ mb: 2 }}>
                <div>
                 
                    {index === steps.length - 1 ? ( <Button
                    variant="outlined"
                    onClick={()=>{
                      if (bookForm.name && bookForm.email && bookForm.phone && bookForm.address && bookForm.roomId && bookForm.checkIn && bookForm.checkOut ) {
                        //&& bookForm.cash && bookForm.paymentId && bookForm.paymentMethod
                        const form = bookForm;
                        console.log(form);
                       dispatch(BookNow({toast,form,navigate})) 
                       resetBookForm()                       
                      }else{
                        toast.error("Please input a valid book");
                      }
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >Book Now</Button>
                  ) : 
                  ( <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >Continue</Button>
                  )
                  }
                   
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
                </Step>
            ))}
          </Stepper>
       
      </div>
    </>
  )

}

export default CreateBooking




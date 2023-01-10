import React from 'react'
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
const CreateBooking = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const {rooms} = useSelector((state)=>state.room)

  const {bookForm} = useBookForm()

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
    content: <UserDetailsForm />
  },
 ]
  return (
    <>
      <Helmet>
        <title>Book | Hotel luner</title>
      </Helmet>
      <div className='container'>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
                <Step>
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
                      console.log(bookForm);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >Finish</Button>
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




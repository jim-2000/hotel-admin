import { Alert, Avatar, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Iconify from '../../iconify/Iconify'
import { useBookForm } from '../../../context/bookContext'
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentsConfig, StripeConfig } from '../../../redux/api';
import { useStripe ,useElements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BookNow } from '../../../redux/slice/bookinSlice';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


//
const BookPaymentDetails = () => {
  const [stripePromice, setStripePromice] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const {bookForm,setBookForm,resetBookForm} = useBookForm()
  
  const MySwal = withReactContent(Swal);
 
  
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
      
    }).then(() => {
      const form = bookForm;
      console.log(form);
      // dispatch(BookNow({toast,form,navigate})) 
      // resetBookForm()   
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const handleINput = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Please Fill up the form and try again',
      time: 4000,
    });
  };
 
 

const onToken = (token) =>{
  setBookForm({...bookForm,token:token})
  console.log(token);
  handleSuccess(); 
}
const priceForStripe = bookForm.totalAmount * 100;
  return (
    bookForm.name && bookForm.email && bookForm.phone && bookForm.roomId && bookForm.checkIn && bookForm.checkOut && <>
     <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51HyfPxG2v0f9y0mmO4iCyDOkmOvviPOgV3N5FhKZKrIDJjMDDKmGjTUtR2SEPN0B20zYIIcSizMlTaWRAL0JmaXm00ijtjVNFU"
        label="Pay Now"
        name="Pay With Credit Card"        
        amount={priceForStripe}
        description={`Your total is $${bookForm.totalAmount}`}
        currency='usd'
        email={bookForm.email}

      />
     {/* {
      stripePromice && clientSecret && (
        <Elements stripe={stripePromice}  options={options}>
          <PayNow />
        </Elements>
      )
     } */}
    </>
  )
}


const PayNow = () =>{
  const stripe = useStripe();
  const elements = useElements();
  const {bookForm,setBookForm} = useBookForm()

  const pay =async ()=>{
    if (!stripe || !elements ) {
      console.log("opss error");
      return;
    }
    console.log(bookForm);
    const {error,data} = await stripe.confirmPayment({
      elements,
      confirmParams:{
        receipt_email:'jimnill932255@gmail.com',
        // return_url:'http://localhost:3000/dashboard/app' 
        
              
      }
    })
    console.log("sorry error",data);
  }
  return (
    <div className='flex flex-col items-center justify-center space-y-3 w-full'>
        <h5>Pay Now</h5>
      <div className="flex">      
        <PaymentElement />      
      </div>
        <Button variant='outlined' onClick={pay}>
          Pay Now {50}
        </Button>
    </div>
  )
}

export default BookPaymentDetails
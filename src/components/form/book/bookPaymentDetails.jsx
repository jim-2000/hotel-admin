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

//
const BookPaymentDetails = () => {
  const [stripePromice, setStripePromice] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const {bookForm,setBookForm} = useBookForm()
  
  const MySwal = withReactContent(Swal);
 
  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
 

const onToken = (token) =>{
  console.log(token);
  handleSuccess();
  setBookForm({...bookForm,token:token});

}
const priceForStripe = bookForm.totalAmount * 100;
  return (
    <>
     <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51HyfPxG2v0f9y0mmO4iCyDOkmOvviPOgV3N5FhKZKrIDJjMDDKmGjTUtR2SEPN0B20zYIIcSizMlTaWRAL0JmaXm00ijtjVNFU"
        label="Pay Now"
        name="Pay With Credit Card"        
        amount={priceForStripe}
        description={`Your total is $${bookForm.totalAmount}`}
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
import React, { forwardRef, useState } from 'react'
import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
 
import { useDispatch, useSelector } from 'react-redux'
import { useBookForm } from '../../../context/bookContext'
import Iconify from '../../iconify/Iconify'
import Datepicker from "react-tailwindcss-datepicker"; 
import { differenceInDays, format } from 'date-fns';
import { SelectRoomById } from '../../../redux/slice/roomSlice'
import { SimpleInput } from '../simpleInput'
import { pink } from '@mui/material/colors'
 
const BookRoomSeelect = () => {
    
    const {rooms,bookRoom} = useSelector((state)=>state.room)
    const {bookForm,setBookForm} = useBookForm()
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null 
    }); 
    const [cost, setCost] = useState(0)
    
    const dispatch = useDispatch()

    const handleValueChange = (newValue) => {
        const newvalS = new Date(newValue.startDate);
        // const formets =  format(newvalS, 'EEE-dd-MM-yyyy'); 
        const newvalE = new Date(newValue.endDate);
        // const formetE =  format(newvalE, 'EEE-dd-MM-yyyy'); 
        const countnight = Number(newvalE - newvalS)/1000/60/60/24 ;                   
        const total = Math.floor(countnight*cost);
        setValue(newValue); 
        setBookForm({...bookForm,checkIn:newvalS,checkOut:newvalE,totalNight:countnight,totalAmount:total});
        console.log(countnight,newValue,total);
    } 
        
  

    const onChanged = (e)=>{
        const {name,value} = e.target;     
        setBookForm({...bookForm, [name]: value}) 
        // const total = Math.floor(bookForm.totalNight*value.price);
        // setCost(value.price)                                    
        // setBookForm({...bookForm,totalAmount:total});
        dispatch(SelectRoomById(value));
        
    }
    const onChange = (e)=>{
        const {name,value} = e.target;     
        setBookForm({...bookForm, [name]: value}) 
        // const total = Math.floor(bookForm.totalNight*value.price);
        // setCost(value.price)                                    
        // setBookForm({...bookForm,totalAmount:total});
        
    }
    React.useEffect(()=>{
      const total = Math.floor(bookForm.totalNight*bookRoom.price);
        setCost(bookRoom.price)                                    
        setBookForm({...bookForm,totalAmount:total});
    },[handleValueChange, onChanged])
  
  return (
    <div className='flex flex-col'>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-2'>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='roomId'
                        value={bookForm.roomId}
                        label={"Select a Room"}
                        defaultValue={bookForm.roomId}
                        onChange={onChanged}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            width: '100%',
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            width: '100%',
                        }}
                    >
                        {
                        rooms && rooms.map((room, index) => {
                            return(                              
                                <MenuItem key={index} value={room._id} className='flex'>
                                    <div className='flex justify-between'>
                                        <Typography>
                                            {room.title}
                                        </Typography>
                                        <div className='flex justify-between'>
                                            <Typography>
                                                {room.price}
                                            </Typography>
                                            <Iconify icon="ph:currency-circle-dollar-bold" color="green" /> 
                                        </div>  
                                    </div>
                                </MenuItem>             
                                )
                        })
                        }                
                    </Select>
                </FormControl>             
              <div className='flex-grow'>
                <Datepicker 
                        containerClassName={'border-2 border-gray-300 py-2'}       
                        primaryColor={"fuchsia"} 
                        useRange={false} 
                        placeholder={"Select check in and Check Out Date"} 
                        value={value} 
                        onChange={handleValueChange} 
                        displayFormat={"DD/MM/YYYY"} 
                    /> 

              </div>
 
        </div>
        <div className='py-2 '>
            <p className='text-gray-500 text-sm text-right'>For <span className='text-teal-500 font-semibold'>{bookForm.totalNight}</span> Night You need To pay <span className='text-teal-500 font-semibold'>${bookForm.totalAmount}</span> and PerNight <span className='text-teal-500 font-semibold'>${cost}</span></p>
        </div>
        <div className='flex items-center'>            
            <Checkbox   
            checked={bookForm.isCarNeed}   
            onChange={(e)=>{
                console.log(e.target.checked);
                setBookForm({...bookForm,isCarNeed:e.target.checked})
            }}
            sx={{
                color: pink[800],
                '&.Mui-checked': {
                  color: pink[600],
                },
              }}
            />
             <Typography variant='body1' color={'gray'}>
                Need a car ? <span className='text-teal-500 font-bold'>we will send you a Audi 9v</span>
            </Typography> 
        </div>
        <div className='py-5'>   
            <Typography variant='body1' color={'gray'}>
                Any Meassage For us
            </Typography>     
            <textarea               
            value={bookForm.message}
            name='message'
            onChange={onChange}
            className='w-full outline-none p-2 text-gray-400 border border-gray-300'            
            placeholder='It`s my 2nd annyversery please decorate our 
            room'          
            style={{
                minHeight:'200px',
            }}
            ></textarea>
        </div>        
    </div>
  )
}


 
export default BookRoomSeelect
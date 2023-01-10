import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useBookForm } from '../../../context/bookContext'
import Iconify from '../../iconify/Iconify'
import Datepicker from "react-tailwindcss-datepicker"; 
 
const BookRoomSeelect = () => {
    const {rooms} = useSelector((state)=>state.room)
    const {bookForm,setBookForm} = useBookForm()

    const [value, setValue] = useState({ 
        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
        }); 
        
        const handleValueChange = (newValue) => {
            const {endDate,startDate} = newValue
        console.log("newValue:", endDate, startDate); 
        setBookForm({...bookForm,checkIn:startDate,checkOut:endDate})
        setValue(newValue); 
        } 


    const onChange = (e)=>{
        const {name,value} = e.target;
        setBookForm({...bookForm, [name]: value})   
    }
  
  return (
    <div className='flex flex-col md:flex-row justify-between items-center'>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='roomId'
                value={bookForm.roomId}
                label={"Select a Room"}
                defaultValue={bookForm.roomId}
                onChange={onChange}
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
                   rooms && rooms.map((room, index) => (
                        // <SelectMenu  room={room} key={index} />
                    <MenuItem key={index} value={room._id} className='flex justify-between'>
                        <Typography>
                            {room.title}
                        </Typography>
                        <div className='flex'>
                            <Iconify icon="ph:currency-circle-dollar-bold" color="green" /> 
                            <Typography>
                                {room.price}
                            </Typography>
                        
                        </div>
                    </MenuItem>
             
                    ))
                }                
            </Select>
        </FormControl>
        <Box 
        width={10}
        height={10}
        />
       <>
       <Datepicker 
        primaryColor={"fuchsia"} 
        useRange={false} 
        asSingle={true} 
        value={bookForm.checkIn} 
        onChange={(val)=>setBookForm({...bookForm,checkIn: val})} 
        displayFormat={"DD/MM/YYYY"} 
        placeholder="Check In Date"
        />
        <Box 
        width={10}
        height={10}
        />
        <Datepicker 
        primaryColor={"fuchsia"} 
        useRange={false} 
        asSingle={true} 
        value={bookForm.checkOut} 
        onChange={(val)=>setBookForm({...bookForm,checkOut: val})}  
        displayFormat={"DD/MM/YYYY"} 
        placeholder="Check Out Date"        
        />
            {/* <MobileDatePicker
            name="checkOut"
            label="Check Out"
            inputFormat="MM/DD/YYYY"
            value={bookForm.checkOut}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
            /> */}
       </>
    </div>
  )
}


 
export default BookRoomSeelect
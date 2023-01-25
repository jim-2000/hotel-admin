import * as React from 'react';
import FileBase from "react-file-base64";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar,FormControl,InputLabel,MenuItem,Select,Stack, Typography } from '@mui/material';
import { SimpleInput } from '../form/simpleInput';
import { useDispatch, useSelector } from 'react-redux';
 import { createUser, fetchUser } from '../../redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Iconify from '../iconify/Iconify';
import { SelectRoomById } from '../../redux/slice/roomSlice';

export default function EditBooking({onFun=()=>{}}) {
  const [roomId, setroomId] = React.useState()
  const {rooms,bookRoom} = useSelector((state)=>state.room)  
  const [open, setOpen] = React.useState(false);  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);    
  };


  const onChanged = (e)=>{
    const {name,value} = e.target;     
    setroomId(value) ;
    // const total = Math.floor(bookForm.totalNight*value.price);
    // setCost(value.price)                                    
    // setBookForm({...bookForm,totalAmount:total});
    dispatch(SelectRoomById(value));        
}

  return (
    <div>
        <div onClick={handleClickOpen}>
             <Iconify icon="material-symbols:settings-applications" color="black"  />
        </div>     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Edit Booking      
        </DialogTitle>
        <DialogContent>
        <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='roomId'
                        value={roomId}
                        label={"Select a Room"}
                        defaultValue={roomId}
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
           
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Cancel</Button>
          <Button onClick={()=>{
            const form ={
            }
            onFun(form);            
            handleClose();
                    
          }} color='success' variant='outlined' >Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { Helmet } from 'react-helmet-async';
import { useState,useEffect } from 'react';
// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
//
import RoomCardShow from '../sections/@dashboard/room/roomCardShow';
import CreateUpdateRoom from '../components/form/CURoom';
import { useDispatch, useSelector } from 'react-redux';
import { Allroom } from '../redux/slice/roomSlice';
import { toast } from 'react-hot-toast';
import { useNavigate, useNavigation } from 'react-router-dom';
import FullPagespinner from '../components/spinner/fullPagespinner';


const RoomPage = () => {
  const {rooms,Rloading} = useSelector((state)=>state.room);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(Allroom(toast));    
  }, [ ])
 
  if(Rloading){
    return <FullPagespinner isloading={Rloading} />;
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Room | Hotel Luner </title>
      </Helmet>
      <div className='w-full h-full px-8'>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Room
          </Typography>
          {/* <CreateUpdateRoom  /> */}
          <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={()=>{
            navigate('/dashboard/createroom')
          }}
          >
            New Room
          </Button>
        </Stack>
        <Grid container spacing={2} >
            {
              // [1,2,3,4,5,6,7,8,9,10,11,12].map((item, index) => <RoomCardShow key={index} />)
              rooms && rooms.map((item, index) => <RoomCardShow key={index} room={item} />)
            }
        </Grid>
      </div>
    </>
  )
}

export default RoomPage
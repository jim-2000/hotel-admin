import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';
import RoomCardShow from '../sections/@dashboard/room/roomCardShow';
import CreateUpdateRoom from '../components/form/CURoom';
const RoomPage = () => {
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
          <CreateUpdateRoom  />
          {/* <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Room
          </Button> */}
        </Stack>
        <Grid container spacing={2} >
            {
              [1,2,3,4,5,6,7,8,9,10,11,12].map((item, index) => <RoomCardShow key={index} />)
            }
        </Grid>
      </div>
    </>
  )
}

export default RoomPage
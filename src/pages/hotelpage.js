import { Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppWidgetSummary } from '../sections/@dashboard/app'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


const Hotelpage = () => {
    const {myhotel} = useSelector((state)=>state.hotel)

    const dispatch = useDispatch()

    const navigate = useNavigate();

  return (
    <>
     <Helmet>
        <title>Hotel | Hotel luner </title>
      </Helmet>
    <div className='container'>
        <div className='py-2'>
            <h2 className='text-gray-600 font-bold'>{myhotel.name}</h2>
            <p className='text-gray-400'>{myhotel.address}</p>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Room" 
            total={872} color="success" icon={'ant-design:home-filled'}          
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Unavailable Room" total={1352831} color="warning" icon={'material-symbols:supervised-user-circle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Available Room" total={1352831} color="info" icon={'material-symbols:supervised-user-circle'} />
          </Grid>
        </Grid>

        <Grid container spacing={3}
        sx={{
            mt: 3,
            mb: 3,
            ml: 'auto',
        }}
        >
          <Grid item xs={12} sm={6} md={4}>
          <WidgetTile
            title={"Add New Hotel"}
            color={"gray"}
            onPress={()=>{
                navigate('/dashboard/createhotel')
            }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <WidgetTile
            title={"Add New Room"}
            onPress={()=>{
                navigate('/dashboard/create-room')
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <WidgetTile
            title={"Update Hotel"}
            onPress={()=>{
                navigate('/dashboard/updatehotel')
            }}
            />
          </Grid>
        </Grid>     

    </div>
    </>
  )
}


const WidgetTile = ({title, onPress,color})=>{
    return (
        <Card
        className='shadow-md text-center p-2 cursor-pointer hover:shadow-lg'
        sx={{
            backgroundColor: `${color ?? '#3a45'}`,
            height: '100%',
            width: '100%',
        }}
        onClick={onPress}
        >
            
        <Typography variant="h6" sx={{ opacity: 0.72 }}>
            {title} 
        </Typography>
        </Card>
    )
}

export default Hotelpage
import React from 'react'
import { Card, Grid, Paper,item, Stack, Typography, Rating } from '@mui/material'
import { Box } from '@mui/system'
import Iconify from '../../../components/iconify/Iconify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AwsomeSlides from '../../../components/slider/AwsomeSlider'
import ConfirmDialog from '../../../components/modalBox/confirmDialog'
import { DeleteRoom } from '../../../redux/slice/roomSlice'
import { toast } from 'react-hot-toast'





const data = [
  {
      id: 1,
      title: 'title 1',
      subtitle: 'subtitle 1',
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
      id: 2,
      title: 'title 2',
      subtitle: 'subtitle 2',
      url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
      id: 3,
      title: 'title 3',
      subtitle: 'subtitle 3',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
      id: 4,
      title: 'title 4',
      subtitle: 'subtitle 4',
      url: 'https://images.unsplash.com/photo-1610289982320-3891f7c9fd6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80'
  }

];
 
const cropDescription = (text,max)=>{
    return text.substring(0,max+1) + '...'+ text.substring(max+1);
}

const HotelCard = ({hotel}) => {
  const navigate = useNavigate();
  const {myhotel} = useSelector((state)=>state.hotel)
  const dispatch = useDispatch()
 
  return ( 
    //flex flex-col md:flex-row 
      <div className='grid grid-cols-1 md:grid-cols-[40%,60%] w-full bg-gray-200  truncate
       m-2 shadow-md cursor-pointer hover:shadow-lg'     
      >
        <div className=' w-full   h-full   bg-gray-100'>         
          <AwsomeSlides 
          data={hotel.photos?.length > 0 ? hotel.photos :  data}
          key={hotel._id}
          />
            {/* <img src={room.img[0].url} alt="room" style={{ height: '100%', width: '100%', objectFit: 'cover' }} className='hover:scale-95' />        */}
        </div>
        <div className='flex flex-col  w-full h-full px-2 py-4 '
        // onClick={()=>navigate('/dashboard/roomdetails', { state: { id: hotel._id} })}
        >       
         <div className='flex justify-between'>
            <div>
                <h4 className="hover:underline text-gray-500 flex items-center font-bold text-lg ">
                {`${hotel.name} ` }
                {hotel.isPrimary && <Iconify icon="mdi:tick-circle" color="green" /> }
                </h4>
                <p  className='pb-2 text-base font-semibold text-gray-600'>
                    {hotel.city}
                </p> 
            </div>
            <div>
                <Typography   className='text-teal-600 font-bold' >
                $ {hotel.cheapestPrice}
                </Typography>
                <Typography variant="body2" gutterBottom>
                Per Night
                </Typography>
          </div>
         </div>      
         <div className='flex-1  truncate' >
                {
                   hotel.description
                }   
            {/* <p className=' text-gray-400'>
            </p> */}
         </div>
         <div className='flex flex-wrap items-start m-1  '>
                {
                    hotel.nearby && hotel.nearby.map((near)=>{
                        return <NearByContainer name={near.name} distance={near.distance} />
                    })
                }
         </div>
        </div>
        {/* <div className='flex flex-col justify-center  md:justify-between w-full md:w-1/6 px-2 py-4 '>
          <div>
            <Typography   className='text-teal-600 font-bold' >
              $ {hotel.cheapestPrice}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Per Night
            </Typography>
          </div>
          <div>
            <Rating name="read-only" value={2} readOnly />
            <div className='flex space-x-2 items-center'>
            <Typography variant="h6" gutterBottom>
              4.5
            </Typography>
            <Typography variant="body2" gutterBottom color={'gray'}>
              Rating
            </Typography>
            </div>
          </div>
          <div className='flex justify-evenly md:justify-between  space-x-2 flex-wrap'>           
            <IconContainer icon={<Iconify icon="eva:edit-2-fill" color="#000"  onClick={()=>{
              console.log("update");
            //   navigate('/dashboard/updateroom',{state:{room:room,id:room._id}})
            }} /> } text='Edit'  
           
            />
            <ConfirmDialog 
            Func={()=>{
              const id = room._id;
            //   dispatch(DeleteRoom({id,toast}))
              console.log(room._id);
            }}
            widget={<>
             <IconContainer icon={<Iconify icon="eva:trash-2-fill" color="#a12" />} text='Delete' color="red" />
            </>}
            />
           
          </div>
        </div>   */}
      </div> 
  )
}

const NearByContainer = ({ name,distance}) => {
  return (
    <div className='flex justify-start flex-1   items-center p-1 m-1 bg-slate-300 hover:bg-slate-400 rounded-md ' >
      <div className='flex '>
        <Iconify icon="material-symbols:arrow-right-rounded" color="teal" /> 
        {name}
      </div>
      <Typography variant="body2" color={'teal'} gutterBottom>
        {distance}
      </Typography>
    </div>
  );
}

export default HotelCard
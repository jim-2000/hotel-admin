import React from 'react'
import { Card, Grid, Paper,item, Stack, Typography, Rating } from '@mui/material'
import { Box } from '@mui/system'
import Iconify from '../../../components/iconify/Iconify'
import { useNavigate } from 'react-router-dom'
import CreateUpdateRoom from '../../../components/form/CURoom'

const RoomCardShow = () => {
  const navigate = useNavigate();
  return ( 
      <div className='flex flex-col md:flex-row w-full bg-gray-200 m-2 shadow-md cursor-pointer hover:shadow-lg '
      
      >
        <div className=' w-full md:w-1/3  h-full   bg-gray-100'>         
            <img src="https://source.unsplash.com/random" alt="room" style={{ height: '100%', width: '100%', objectFit: 'cover' }} className='hover:scale-95' />       
        </div>
        <div className='flex flex-col w-full md:w-1/2 px-2 py-4 relative'>       
          <Typography variant="h6" gutterBottom onClick={()=>navigate('/dashboard/roomdetails', { state: { id: '123456' } })} className="hover:underline">
            Room Name
          </Typography>
          <Typography variant="h4" gutterBottom color={"GrayText"}>
            Part of the room Dohar
          </Typography>
          <Typography variant="body2" gutterBottom color={"GrayText"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorrem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.adipisicing elit. Quisquam, quod.lorrem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.adipisicing elit. Quisquam, quod.lorrem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.adipisicing elit. Quisquam, quod.lorrem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
          </Typography>
          {/* <div>
            
          </div> */}
          <div className='flex flex-wrap justify-between items-center space-x-1 p-4 bg-gray-5000'>
            <IconContainer icon={<Iconify icon="mdi:bed" color="#a1925" />} text='2 beds'  />
            <IconContainer icon={<Iconify icon="mdi:bed" color="#a1925" />} text='2 beds'  />
            <IconContainer icon={<Iconify icon="mdi:bed" color="#a1925" />} text='2 beds'  />
            <IconContainer icon={<Iconify icon="carbon:cafe" color="#000" />} text='Cafe'  />
            <IconContainer icon={<Iconify icon="material-symbols:meeting-room" color="#000" />} text='2 beds'  />
            <IconContainer icon={<Iconify icon="material-symbols:meeting-room" color="#000" />} text='2 beds'  />
            <IconContainer icon={<Iconify icon="material-symbols:meeting-room" color="#000" />} text='2 beds'  />
          </div>
        </div>
        <div className='flex flex-col justify-center  md:justify-between w-full md:w-1/6 px-2 py-4 '>
          <div>
            <Typography   className='text-teal-600 font-bold' >
              $ 100
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
          <div className='flex justify-evenly md:justify-between '>
          <CreateUpdateRoom isupdate={true}  />
            {/* <IconContainer icon={<Iconify icon="eva:edit-2-fill" color="#000" />} text='Edit'  /> */}
            <IconContainer icon={<Iconify icon="eva:trash-2-fill" color="#a12" />} text='Delete' color="red" />
          </div>
        </div>
      </div> 
  )
}

const IconContainer = ({ icon, text}) => {
  return (
    <div className='flex'>
      {icon}
      <Typography variant="body2" gutterBottom>
        {text}
      </Typography>
    </div>
  );
}

export default RoomCardShow
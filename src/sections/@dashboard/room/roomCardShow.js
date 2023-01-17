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
 


const RoomCardShow = ({room}) => {
  const navigate = useNavigate();
  const {myhotel} = useSelector((state)=>state.hotel)
  const dispatch = useDispatch()
 
  return ( 
      <div className='flex flex-col md:flex-row w-full bg-gray-200 h-fit truncate
       m-2 shadow-md cursor-pointer hover:shadow-lg'     
      >
        <div className=' w-full md:w-1/3  h-full   bg-gray-100'>         
          <AwsomeSlides 
          data={room?.img?.length > 0 ? room.img :  data}
          />
            {/* <img src={room.img[0].url} alt="room" style={{ height: '100%', width: '100%', objectFit: 'cover' }} className='hover:scale-95' />        */}
        </div>
        <div className='flex flex-col w-full md:w-1/2 px-2 py-4 relative'
        onClick={()=>navigate('/dashboard/roomdetails', { state: { id: room._id} })}
        >       
          <Typography variant="h4" gutterBottom color={"GrayText"}    onClick={()=>navigate('/dashboard/roomdetails', { state: { id: room._id } })} className="hover:underline">
            {room.title}
          </Typography>
          <Typography variant="caption" className='pb-2'>
            This Room is Part of {myhotel.name}
          </Typography>
          <div className='flex items-center'>
                 {/*// 0 for single, 1 for double, 2 for family */}
             <p className='text-base font-bold text-gray'>{room.roomType === 0 ? 'Singel' : room.roomType == 1 ? 'Double' :'Family' } Room</p>
          </div>
          <div className='bg-transparent truncate' 
          dangerouslySetInnerHTML={{__html: room.description }}
          />
       
          <div className='flex flex-wrap justify-between items-center space-x-1 p-4 bg-gray-5000'>
            {

             room.roomFeature && room.roomFeature.map((feature,index)=>{
                return  <IconContainer icon={<Iconify icon={feature.icon} color="teal" />} text={feature.name} key={index} />;
              })
            }            
          </div>
        </div>
        <div className='flex flex-col justify-center  md:justify-between w-full md:w-1/6 px-2 py-4 '>
          <div>
            <Typography   className='text-teal-600 font-bold' >
              $ {room.price}
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
              navigate('/dashboard/updateroom',{state:{room:room,id:room._id}})
            }} /> } text='Edit'  
           
            />
            <ConfirmDialog 
            Func={()=>{
              const id = room._id;
              dispatch(DeleteRoom({id,toast}))
              console.log(room._id);
            }}
            widget={<>
             <IconContainer icon={<Iconify icon="eva:trash-2-fill" color="#a12" /> } text='Delete' color="red" />
            </>}
            />
           
          </div>
        </div>
      </div> 
  )
}

const IconContainer = ({ icon, text}) => {
  return (
    <div className='flex' >
      {icon}
      <Typography variant="body2" gutterBottom>
        {text}
      </Typography>
    </div>
  );
}

export default RoomCardShow
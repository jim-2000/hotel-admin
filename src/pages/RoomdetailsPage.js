import { Avatar, ImageList, ImageListItem } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Roomservices from '../sections/@dashboard/room/roomService';

const RoomdetailsPage = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className='w-full h-full container py-2 '>
    <div className='flex justify-between items-center'>
      <h6 className=' font-extrabold text-2xl '>Delux Singel Room</h6>
      <div className='flex flex-col justify-start items-center'>
          <h6 className='text-gray font-extrabold font-body text-2xl'>$ 500</h6>
          <h6 className=' font-semibold font-body'>per night</h6>
      </div>   
      <div className='flex flex-col justify-start items-center'>
          <h6 className='text-gray font-extrabold font-body text-2xl'>4</h6>
          <h6 className=' font-semibold font-body'>Guests</h6>
      </div>     
    </div>
      
      <div className='flex flex-col justify-start items-start space-y-1 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Details</h6>
          <p className=' font-semibold font-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. {`\n The React Scheduler, or event calendar, is a fully featured event calendar component that helps users manage their time efficiently. It facilitates easy resource scheduling and the rescheduling of events or appointments through editor pop-ups, drag and drop, and resizing actions.`}</p>         
     </div>     
        <div className='flex flex-col justify-start items-start space-y-1 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Services</h6>
          <div className='flex items-center flex-wrap'>
            {
              [1,2,3,4,5,6,7,8,9,10,11].map((item, index) => <Roomservices key={index} />)
            }
          </div>
        </div>
        <div className='flex flex-col justify-start items-start space-y-2 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Images</h6>
          <div className='w-full'>  
            <RoomImageList />
          </div>
        </div>
        <div className='flex flex-col justify-start items-start space-y-2 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Reviews</h6>
          <div className='w-full flex flex-col space-y-4'>
          {
              [1,2,3,4,5,6,7,8,9,10,11,12].map((item, index) => <RoomReviewList key={index} />)
            }
            
          </div>
        </div>
        
    </div>
  )
}

const RoomReviewList = ()=>{
  return (
    <>
      <div className='flex flex-col justify-start items-start space-y-3 shadow-lg p-2 hover:shadow-2xl hover:border-b-2 hover:border-pink-700'>       
        
            {/* <img src="https://source.unsplash.com/random" alt="" className='w-10 h-10 rounded-full object-cover' /> */}
            <div className='flex flex-col justify-start items-start space-y-1'>
            <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" 
             sx={{ width: 56, height: 56 }}
            />
              <h6 className='text-gray-500 font-extrabold text-lg '>John Doe</h6>
              <h6 className='text-sm text-gray-400'>{Date('YY/MM/DD')}</h6>
              <p className=' text-gray-500 text-base '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. {`\n The React Scheduler, or event calendar, is a fully featured event calendar component that helps users manage their time efficiently. It facilitates easy resource scheduling and the rescheduling of events or appointments through editor pop-ups, drag and drop, and resizing actions.`}</p>
            </div>
      
       </div>
    </>
  )
}

const RoomImageList = ()=>{
  return (
    <>
      <ImageList className='h-[450px]' variant="woven" cols={4} gap={8} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className='w-full h-1/2 object-cover'
              onClick={()=>console.log(item)}
            />
          </ImageListItem>
        ))}
</ImageList>
    </>
  )
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default RoomdetailsPage
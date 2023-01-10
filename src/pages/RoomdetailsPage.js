import { Avatar, ImageList, ImageListItem } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Roomservices from '../sections/@dashboard/room/roomService';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingelRoom } from '../redux/slice/roomSlice';
import { toast } from 'react-hot-toast';
import Iconify from '../components/iconify/Iconify';
import FullPagespinner from '../components/spinner/fullPagespinner';
import AwsomeSlides from '../components/slider/AwsomeSlider';


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

 

const RoomdetailsPage = () => {
  const { Rloading ,singelRoom} = useSelector((state)=>state.room)

  const location = useLocation();

  const dispatch = useDispatch();

  console.log(location.state);
// const singelRoom = location.state.room;
  React.useEffect(()=>{
    dispatch(GetSingelRoom({id: location.state.id , toast:toast}))
  },[])

  if(Rloading){
    return <FullPagespinner isloading={Rloading}  />
  }
 
  return (
    <div className='w-full h-full container py-2 '>
      <div className='py-4'>
        <AwsomeSlides 
          data={singelRoom.img ??  data}
          />
      </div>
    <div className='  flex-col md:flex-row justify-between  items-end  '>
      <h6 className=' font-extrabold text-2xl text-gray-700 '>{singelRoom.title ?? 'Luxary Room'}</h6>
      <div className='flex flex-col justify-start items-end'>
          <h6 className='text-gray-500 font-extrabold font-body text-2xl'><span className='text-teal-600'>$ </span>{singelRoom.price ?? '85'}</h6>
          <h6 className='text-gray-700 font-semibold font-body'>per night</h6>
      </div>   
      <div className='flex flex-col  justify-between items-start'>       
          <h6 className='text-gray-500 font-extrabold font-body text-2xl'>{singelRoom.maxGuests ?? '4'}</h6>
          <h6 className='text-gray-700 font-semibold font-body'>Max Guests</h6>        
      </div> 
    </div>
      
      <div className='flex flex-col justify-start items-start space-y-1 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Details</h6>
          <div className='py-4' 
            dangerouslySetInnerHTML={{__html: singelRoom.description ?? 'Description'}}            
          />         
     </div>     
     <div className='flex flex-col justify-start items-start space-y-1 py-2 flex-wrap'>
        <div className='flex items-center'>
        {/*// 0 for single, 1 for double, 2 for family */}
          <span className='text-lg font-semibold text-gray-600'>Room Type </span> : <p className='text-lg font-bold text-gray uppercase'>{singelRoom.roomType == 0 ? 'Singel' : singelRoom.roomType == 1 ? 'Double' :'Family' }</p>
        </div>
        <div className='flex items-center'>
        {/* // enum ['2 Single','2 Double','1 King']  */}
          <span className='text-lg font-semibold text-gray-600'>Bed Type </span> : <p className='text-lg font-bold text-gray uppercase'>{singelRoom.bedType == 0 ? 'Singel' : singelRoom.bedType == 1 ? 'Double' :'King' }</p>
        </div>
     </div>
      <div className='flex flex-col justify-start items-start space-y-1 py-2'>
          <h6 className=' font-extrabold text-2xl '>Room Services</h6>
          <div className='flex items-center flex-wrap'>
            {
              // singelRoom.roomFeature.length > 0 ?  singelRoom.roomFeature.map((item, index) => <Roomservices key={index} item={item}  />) :
              singelRoom.roomFeature && singelRoom.roomFeature.map((item, index) => <Roomservices key={index} item={item}  />) 
            }
          </div>
      </div>
      <div className='flex flex-col justify-start items-start space-y-2 py-2'>
            <h6 className=' font-extrabold text-2xl '>Room Images</h6>
            <div className='w-full'>  
              {
                singelRoom.img && <RoomImageList itemData={singelRoom.img.length > 0 ? singelRoom.img : data} key={121212} />              
              } 
            </div>
      </div>
       
      <div className='flex flex-col justify-start items-start space-y-2 py-2'>
            <h6 className=' font-extrabold text-2xl '>Room Reviews</h6>
            <div className='w-full flex flex-col space-y-4'>
            {
              [1,2,3,4].map((item, index) => <RoomReviewList key={index}  />)          
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

const RoomImageList = ({itemData})=>{
  return (
    <>
      <ImageList className='h-[450px]' variant="woven" cols={4} gap={8} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.public_Id} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              src={`${item.url}`}
              srcSet={`${item.url}`}
              alt={item.public_Id}
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
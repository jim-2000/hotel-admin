import { Button, Container, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Iconify from '../components/iconify/Iconify';
import { useHotel } from '../context/hotelContext';
import { SimpleInput } from '../components/form/simpleInput';
import DropDownInput from '../components/form/dropDownInput';
import UserMap from '../components/map/userMap';
import RoomFeacher from '../components/form/roomFeacher';
import NewFeacher from '../components/form/newFeacher';
import { AppTasks } from '../sections/@dashboard/app';
import TaskFaq from '../components/faq/TaskFaq';
import FaqForm from '../components/form/faqForm';
import { useDispatch, useSelector } from 'react-redux';
import { Setmyhotel, addFaq, addImage, addNearBy, createHotel, getHotel, removeFaq, removeImage, removeNearBy, updateHotel } from '../redux/slice/hotelSlice';
import { Box } from '@mui/system';
import Swal from 'sweetalert2'
import MultipleImage from '../components/imageup/addMultipleImage';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';
import Filebase from 'react-file-base64'
import { useNavigate, useNavigation } from 'react-router-dom';
import FullPagespinner from '../components/spinner/fullPagespinner';


const UpdateHotel = () => {
  const [lat, setLati] = React.useState("");
    
  const [photos , setPhotos] = React.useState([]);

  const { myhotel, Hloading  } = useSelector((state) => state.hotel);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  
  const {hotel, setHotel,updateHotelvalue} = useHotel(); 
  
  const navigate = useNavigate();


 

  const onChange = (e)=>{
    const {name,value} = e.target;
    setHotel({...hotel, [name]: value})   
  }
 
  const position = async ()=>{
        navigator.geolocation.watchPosition((po)=>{
        setHotel({...hotel,lat:po.coords.latitude,long:po.coords.longitude})
      })
  }

 

const update = ()=>{
  position()
  const form ={
    name: hotel.name,
    description: hotel.description,
    type: hotel.type,
    city: hotel.city,
    address: hotel.address,
    lat: hotel.lat,
    long: hotel.long,    
  }
  // console.log(form);
  dispatch(updateHotel({form,toast}));
}


 

React.useEffect(()=>{
  updateHotelvalue()
  console.log(myhotel, hotel);
},[])

// if(Hloading){
//   return <FullPagespinner isloading={Hloading}   />
// }
  return (
    <>
       <Helmet>
        <title> Update Hotel | Hotel luner </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update-Hotel
          </Typography>
        <Button variant="outlined"startIcon={<Iconify icon="eva:plus-fill" />} 
                onClick={update}>Save Hotel INFO</Button>  
        </Stack>
      </Container>
      <div className='container'>
        {
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2'>
            <div className='space-y-2'>
            <Typography variant='h6'>
                  Hotel Info
            </Typography>
            <div className='space-y-4'>
              <SimpleInput 
                label={"Hotel Name"}
                fullWidth={true}
                name="name"       
                type="text"  
                placeholder={myhotel.name}   
                onChange={onChange} 
                value={hotel.name}
                />
              <SimpleInput 
                label={"Hotel Description"}
                fullWidth={true}
                name="description"       
                type="text"  
                placeholder={myhotel.description}   
                onChange={onChange} 
                multiline
                maxRows={8}
                value={hotel.description?? ''}
              />
              <SimpleInput 
                label={"City"}
                fullWidth={true}
                name="city"       
                type="text"  
                placeholder={myhotel.city}  
                onChange={onChange} 
                value={ hotel.city?? ''}
              />
              <SimpleInput 
                label={"Address"}
                fullWidth={true}
                name="address"      
                type="text"  
                placeholder={myhotel.address} 
                onChange={onChange} 
                multiline
                maxRows={4}
                value={hotel.address?? ''}
              />
              <Stack direction={'row'} >
                <SimpleInput 
                  label={"Latitude"}
                  fullWidth={true}
                  name="img"       
                  type="text"  
                  placeholder={myhotel.lat ?? '23.66'} 
                  disabled={true}
                  value={hotel.lat}
                  sx={{
                    marginRight: '0.5rem',
                  }}
                />
                <SimpleInput 
                  label={"longitude"}
                  fullWidth={true}
                  name="img"       
                  type="text"  
                  placeholder={myhotel.long ?? '999'} 
                  disabled={true}
                  value={hotel.long}
                />  
              </Stack>   
             
            </div>                
          </div>
          <div className='space-y-4 mt-8 '>
              <DropDownInput 
              label={'Hotel Type'}
              name={'type'}
              defaultValue={myhotel.type}
              mapData={[
                // 1-hotel, 2-motel, 3-resort, 4-hostel, 5-guesthouse
                {name: 'Hotel', value: '1'},
                {name: 'Motel', value: '2'},
                {name: 'Resort', value: '3'},
                {name: 'Hostel', value: '4'},
                {name: 'Guesthouse', value: '5'},              
              ]}
              setval={(e)=>{
                setHotel({
                ...hotel,
                type: e.target.value,
                })
              }} 
              />
             <Typography variant='h6'>
                Rulse and Regulation              
              </Typography>
              <Typography variant='body2' color={'GrayText'}>
                if you want to change this rulse contact with @admin
              </Typography>            
                         
                <SimpleInput 
                  label={"Check IN Time"}
                  fullWidth={true}
                  name="checkOut"       
                  type="text"  
                  placeholder={myhotel.checkIn ?? '12 AM'} 
                  onChange={onchange}
                  value={hotel.checkIn}
                />                            
              <SimpleInput 
                label={"Check Out Time"}
                fullWidth={true}
                name="checkIn"       
                type="text"  
                placeholder={myhotel.checkOut ?? '12 AM'} 
                onChange={onChange}
                value={hotel.checkOut}                                
              />
                     
            </div>   
        </div> 
        
        }
          <Typography variant="h6" gutterBottom>
            Add Aditional INFO
          </Typography>
        <div className='mt-8 p-4 border-2 border-gray-600 shadow-md'>
                <div className=''>
                  <AppTasks 
                  list={myhotel.nearby}
                  handleDelete={(i)=>{
                    const form ={
                      nId:i,
                    }
                    console.log(i);
                    const id =myhotel._id                   
                    dispatch(removeNearBy({id, form,toast}))

                  }}
                  widget={
                    <div className='flex justify-between items-center'>
                    <Typography variant='h6'>
                      Near By
                    </Typography>
                    <NewFeacher 
                    title={"Add New Near By"}
                    
                    widget={
                        <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-auto"  >Add New Feacher</Button>
                    }    
                    Func={(newdata)=>{
                      const form = newdata;
                      console.log(form);                      
                      dispatch(addNearBy({id:myhotel._id, form,toast,navigate}))
                    }}       
                    
                    info={"add near feacher like.. park, Airport, sea beach"}
                    />                              
                </div> 
                  }
                  />
              </div>
              <div>
                <TaskFaq 
                handleDelete={(i)=>{
                  const form ={
                    eId:i,
                  }
                  const id =myhotel._id                   
                  dispatch(removeFaq({id, form,toast}))
                  }
                }
                list={myhotel.faq}
                widget={
                  <div className='flex justify-between items-center'>
                  <Typography variant='h6'>
                    Frequently Asked Questions
                  </Typography>
                  <FaqForm 
                  title={"Add New Faq"}            
                  widget={
                      <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-auto"  >Add New Faq</Button>
                  }    
                  Func={(newdata)=>{
                    const form = newdata;
                    dispatch(addFaq({id:myhotel._id, form,toast,navigate}))
                  }}                       
                  info={"Answer your user Question"}
                  />                              
                  </div>
                  }
              />
            </div>  
            <div className='flex justify-between items-center'>
              <Typography variant="h6" gutterBottom>
                Add New Image
              </Typography>
              <div>
               
                <Button variant="outlined"  className="w-auto"  >
                <Filebase 
                onDone={async ({base64}) =>{
                  const form ={
                   file: base64,
                  }
                  dispatch(addImage({id:myhotel._id, form,toast,navigate}))
                }}
                />
                </Button>

              </div>
            </div>
            <div className='border-2-red border h-max-min p-2 grid gap-3 grid-cols-2 md:grid-cols-4 '>
                {
                  myhotel.photos && myhotel.photos.map((img,index)=>{
                    return (
                      <div key={index} className='relative'>
                          <img src={img['url']} className='w-60 h-60 object-cover'/>
                          <MenuItem 
                              sx={{ color: 'error.main',position:'absolute',
                              zIndex:999 ,top:10,right:10,                           
                              backgroundColor: 'rgba(0,0,0,0.6)',
                              border: '1px solid rgba(0,0,0,0.12)',
                              borderRadius: '2px',
                            }}
                              onClick={()=>{
                                const form =img;
                                console.log(form);
                                dispatch(removeImage({id:myhotel._id,form}))
                              }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                          </MenuItem>
                      </div>
                    )
                  })
                }
              </div>
          {/* hotel address map  */}
          <div className='mt-10'>
            <UserMap 
            lat={hotel.lat}
            long={hotel.long}
            />
          </div>
        </div>
      </div>
    </>
  )
  
}

export default UpdateHotel
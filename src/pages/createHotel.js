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
import { createHotel, getHotel, updateHotel } from '../redux/slice/hotelSlice';
import { Box } from '@mui/system';
import Swal from 'sweetalert2'
import MultipleImage from '../components/imageup/addMultipleImage';
import Filebase from 'react-file-base64'


const CreateHotel = () => {
  const [lat, setLati] = React.useState("");
    
  const [photos , setPhotos] = React.useState([]);

  const { myhotel, Hloading  } = useSelector((state) => state.hotel);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  
  const {hotel, setHotel,RemoveNearby,ResetForm} = useHotel(); 


  const onChange = (e)=>{
    const {name,value} = e.target;
    setHotel({...hotel, [name]: value})   
  }
 
  const position =  ()=>{
        navigator.geolocation.watchPosition((po)=>{       
        setHotel({...hotel,lat:po.coords.latitude,long:po.coords.longitude})
      })
  }

const submit = ()=>{
  if (hotel.name && hotel.description && hotel.city && hotel.address != null) {
      console.log(hotel);
      dispatch(createHotel({hotel: hotel, tag:{}}));
      // setHotel({name:'',description:'',city:'',address:'',photos:[],nearby:[],faq:[]})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the required fields',
        footer: 'please Fill up name description city cheapestPrice type',
      })
      console.log(hotel);          
    }
    // dispatch(createHotel(hotel))
    // setHotel({...hotel,photos:[]})
}

 


React.useEffect(()=>{     
  ResetForm();
  setHotel({name:'',description:'',city:'',address:'',photos:[],nearby:[],faq:[]})
  position();
  console.log(hotel);
},[])

 
if (Hloading) {
  return  <div className='flex items-center justify-center'>Loading.......</div>
}


  return (
    <>
       <Helmet>
        <title> Create Hotel | Hotel luner </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            CREATE-HOTEL
          </Typography>
        <Button variant="outlined"startIcon={<Iconify icon="eva:plus-fill" />} 
                onClick={submit}>C R E A T E</Button>  
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
                placeholder={"Hotel Luner"}   
                onChange={onChange} 
                value={hotel.name ?? ''}
                />
              <SimpleInput 
                label={"Hotel Description"}
                fullWidth={true}
                name="description"       
                type="text"  
                placeholder={"Hotel Luner"}   
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
                placeholder={"Hong Kong"}   
                onChange={onChange} 
                value={ hotel.city?? ''}
              />
              <SimpleInput 
                label={"Address"}
                fullWidth={true}
                name="address"      
                type="text"  
                placeholder={"1/2 Main St"}   
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
                  placeholder={"23.036"}
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
                  placeholder={"669.251056"}
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
              defaultValue={hotel.type}
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
                  name="checkIn"       
                  type="text"  
                  placeholder={"12pm"}
                 onChange={onchange}
                  value={hotel.checkIn}
                />               
             
                      
              <SimpleInput 
                label={"Check Out Time"}
                fullWidth={true}
                name="checkOut"       
                type="text"  
                placeholder={"12pm"}
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
                  list={hotel.nearby}
                  handleDelete={(name)=>RemoveNearby(name)}
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
                      setHotel({...hotel,nearby:[...hotel.nearby,newdata]});
                      // setRoom({...room,roomFeature:[...room.roomFeature,form]}) 
                    }}       
                    
                    info={"add near feacher like.. park, Airport, sea beach"}
                    />                              
                </div> 
                  }
                  />
              </div>
              <div>
                <TaskFaq 
                  list={hotel.faq}
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
                      setHotel({...hotel,faq:[...hotel.faq,newdata]});                    
                    }}                       
                    info={"Answer your user Question"}
                    />                              
                  </div>
                  }
              />
            </div>  
           
              <div>               
                <MultipleImage 
                setval={setHotel}
                widget={
                  <div className='w-full bg-slate-400 p-4 rounded-sm cursor-pointer'>
                     <div className='flex items-start cursor-pointer font-bold text-white'>
                        <h6>
                          Add  Images                         
                        </h6>
                        <div className='animate-bounce'>
                          <Iconify icon="eva:plus-fill" color={"red"} size={24} />
                        </div>
                     </div>
                     <small>add images and click hare</small>
                  </div>
                }
                ismultiple={true}                
                />
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

export default CreateHotel
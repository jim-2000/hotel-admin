import React from 'react'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRoom } from '../context/roomContext';
import draftToHtml from 'draftjs-to-html';
import { Button, Container, Typography } from '@mui/material';
import { SimpleInput } from '../components/form/simpleInput';
import DropDownInput  from '../components/form/dropDownInput';
import ImageUp from '../components/imageup/imageUploading';
import Iconify from '../components/iconify/Iconify';
import { Helmet } from 'react-helmet-async';
import { Stack } from '@mui/system';
import RoomFeacher from '../components/form/roomFeacher';
import { AppTasks } from '../sections/@dashboard/app';
import { useDispatch, useSelector } from 'react-redux';
import { AddFeacher, Createroom } from '../redux/slice/roomSlice';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import FullPagespinner from '../components/spinner/fullPagespinner';

const CreateRoom = () => {    
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const [singelImg,setSingelImg] = React.useState([]);

    const [mImg,setMImg] = React.useState();

    const {Rloading} = useSelector((state)=>state.room);

    const dispatch = useDispatch();

    const {room,setRoom,resetRoom,RemoveFeacher} = useRoom();

    const sendData = () => {
        setRoom({...room,description:draftToHtml(convertToRaw(editorState.getCurrentContent()))})
        // console.log(room.description);
    }

    const navigate = useNavigate();

    React.useEffect(() => {
      resetRoom()
    },[]);
    if(Rloading){
      return <FullPagespinner isloading={Rloading} />;
    }
  return (
    <>
      <Helmet>
        <title> Create Room | Hotel luner </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create-Room
          </Typography>           
           
          <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} 
          onClick={()=>{
            const form = room;         
            console.log(form);
            if (room.title && room.description && room.roomNumber && room.price) {
              dispatch(Createroom({form,toast,navigate}))              
            }else{
              toast.error("Please input a valid book");
            }
          }}
          >Save</Button>
            
            
           
        </Stack>
      </Container>
    <div className='grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-x-2'>
        <div className='shadow h-fit p-2 '>
          <Typography variant='h6'>
              Room Info
          </Typography>
          <div className='space-y-2'>
              <SimpleInput 
              fullWidth={true}
              name="Room Name"
              label={"Room Name"}
              type="text"  
              placeholder={"Delux Room"}   
              onChange={(e)=>{
                 setRoom({...room,title:e.target.value})
              }}         
              />
              <SimpleInput 
              fullWidth={true}
              name="Room Number"
              label={"Room Number"}
              type="number"        
              placeholder={"4502"}  
              helperText="unique number by couting floor number"  
              onChange={(e)=>{
                setRoom({...room,roomNumber:e.target.value})
             }}   
              />
              <SimpleInput 
              fullWidth={true}
              name="Room Price"
              label={"Room Price"}
              type="number"        
              placeholder={"$ 45"}     
              onChange={(e)=>{
                setRoom({...room,price:e.target.value})
             }}
              />
              <SimpleInput 
              fullWidth={true}
              name="Room maxGuests"
              label={"max Guests"}
              type="number"        
              placeholder={"2"}   
              onChange={(e)=>{
                setRoom({...room,maxGuests:e.target.value})
             }}  
              />
              <SimpleInput 
              fullWidth={true}
              name="Room Size"
              label={"Room Size"}
              type="number"        
              placeholder={"2000 sc"}   
              onChange={(e)=>{
                setRoom({...room,size:e.target.value})
             }}    
              />
              
              <DropDownInput
              setval={(e)=>{
                setRoom({...room,roomType:e.target.value}) 
              }}
              label={"Room Type"}
              mapData={
                [
                  {
                    'name':'Singel',
                    'value':'0'
                  },
                  {
                    'name':'Double',
                    'value':'1'
                  },
                  {
                    'name':'Family',
                    'value':'2'
                  },
                ]
              }
              />
               <DropDownInput
                setval={(e)=>{
                  setRoom({...room,bedType:e.target.value}) 
                }}
              label={"Bed Type"}
              mapData={
                [
                  {
                    'name':'Single',
                    'value':'0'
                  },
                  {
                    'name':'Double',
                    'value':'1'
                  },
                  {
                    'name':'King',
                    'value':'2'
                  },
                ]
              }
              />
              <DropDownInput
                 setval={(e)=>{
                  setRoom({...room,totalBed:e.target.value}) 
                }}
              label={"Total Bed"}
              mapData={
                [
                  {
                    'name':'One King',
                    'value':'1'
                  },
                  {
                    'name':'Double Bed',
                    'value':'2'
                  },
                  {
                    'name':'Singel Bed',
                    'value':'3'
                  },
                ]
              }
              />
          </div>
        </div>
      <div className='overflow-scroll p-2 flex-1'>
          <div className='spacy-y-4'>
            <Typography variant='h6'>
                  Basic Information
              </Typography>
            <Editor              
              editorState={editorState}
              onEditorStateChange={(editorState)=>{setEditorState(editorState); sendData()}}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="border-2  px-2 overflow-scroll min-h-[200px]"
              toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker','emoji'],
                  inline: {
                      inDropdown: false,
                  },              
              }}
            /> 
            <div className='py-5'>          
              <span className='text-sm text-orange-400'>Some basic feacher are alrady added like <span className='text-gray-500'>wifi, fredge, Tv, coffe, Air, etc <small className='text-gray-600'>you change it from main server</small> </span> </span>
              <div className='flex justify-between items-center'>
                <Typography variant='h6'>
                  Room Feacher
                </Typography>
                <RoomFeacher 
                widget={
                    <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-auto"  >Add New Feacher</Button>
                }           
                Fun={(data)=>{
                  const form = data;
                  // const id = room._id;
                  // dispatch(AddFeacher({id,form,toast}))
              }}
                />                              
              </div>   
              <>
                <AppTasks
                  title=""
                  subheader={"You can delete Feacher from hare"}
                  list={room.roomFeature}
                  handleDelete={(i)=>RemoveFeacher(i.name)}
                />
                </>              
            </div>  
           
            <div className='py-2'>
              <ImageUp
              value={mImg}
              setval={setMImg}
              ismultiple={true}
              widget={<>
                 <div className='w-full h-14 rounded bg-gray-500 flex items-center justify-center cursor-pointer'>
                  <Typography variant='h3'>Room Image</Typography>
                  <Iconify icon="eva:plus-fill" width={24} color="red" />
                </div>
              </>}
              />
            </div >
                      
            
           
          </div>
     
    </div>
    </div>
  
  

  </>
  )
}

export default CreateRoom
import React from 'react'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRoom } from '../context/roomContext';
import draftToHtml from 'draftjs-to-html';
import { Button, Container, Typography } from '@mui/material';
import { SimpleInput } from '../components/form/simpleInput';
import DropDownInput, { RadioButtonGrp } from '../components/form/dropDownInput';
import ImageUp from '../components/imageup/imageUploading';
import Iconify from '../components/iconify/Iconify';
import { Helmet } from 'react-helmet-async';
import { Stack } from '@mui/system';
import RoomFeacher from '../components/form/roomFeacher';
import { AppTasks } from '../sections/@dashboard/app';
import { useDispatch } from 'react-redux';
import { checkApi } from '../redux/slice/hotelSlice';
import FileBase from "react-file-base64";
const CreateRoom = () => {    
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const [singelImg,setSingelImg] = React.useState([]);

    const [mImg,setMImg] = React.useState();

    const [feacher,setFeacher] = React.useState([])

    const dispatch = useDispatch();

    const {room,setRoom} = useRoom();

    const sendData = () => {
        setRoom({...room,description:draftToHtml(convertToRaw(editorState.getCurrentContent()))})
        // console.log(room.description);
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
            // setRoom({...room,img:mImg,coverImg:singelImg})          
            // console.log(room);
            const form = {
              img:room.img,
            }
            console.log(form);
            dispatch(checkApi(form))
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
              <RadioButtonGrp 
              label={"Room Status"}
              setval={(e)=>{                
                  setRoom({...room,roomstatus:e.target.value})               
              }}
              arryofGrp={
                [
                  {
                    'name':'Published',
                    'value':'published'
                  },
                  {
                    'name':'Scheduled',
                    'value':'scheduled'
                  },
                  {
                    'name':'Hidden',
                    'value':'hidden'
                  },
                ]
              }
              isrow={true}
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
            <div className='py-2'>
            {/* <FileBase 
              key={"imageFile"}
              name={"imageFile"}
                type="file"
                multiple={false}
                onDone={({ base64 }) =>{
                  setRoom({ ...room, coverimg: base64 })                
                }
                
                }
            /> */}
              <ImageUp     
              value={singelImg}      
              setval={setSingelImg}
              widget={
                <div className='w-full h-14 rounded bg-gray-500 flex items-center justify-center cursor-pointer'>
                  <Typography variant='h3'>Room Cover Image</Typography>
                  <Iconify icon="eva:plus-fill" width={24} color="red" />
                </div>
              }
              />
            </div>  
            <div className='py-2'>
              <ImageUp
              value={mImg}
              setval={setMImg}
              ismultiple={true}
              widget={<><Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-full"  >Add More Image</Button></>}
              />
            </div >
            <div className='py-2 overflow-hidden'>
              <div className='flex justify-between items-center'>
                <Typography variant='h6'>
                  Room Feacher
                </Typography>
                <RoomFeacher 
                widget={
                    <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-auto"  >Add New Feacher</Button>
                }           
                />                              
              </div>   
              <>
                <AppTasks
                  title=""
                  subheader={"You can delete Feacher from hare"}
                  list={room.roomFeature}
                  // list={[
                  //   { id: '1', label: 'Create FireStone Logo' },
                  //   { id: '2', label: 'Add SCSS and JS files if required' },
                  //   { id: '3', label: 'Stakeholder Meeting' },
                  //   { id: '4', label: 'Scoping & Estimations' },
                  //   { id: '5', label: 'Sprint Showcase' },
                  // ]}
                />
                </>              
            </div>              
            
           
          </div>
     
    </div>
    </div>
  
  

  </>
  )
}

export default CreateRoom
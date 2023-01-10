import { Alert, AlertTitle, Avatar, Box, Button, Container, MenuItem, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Iconify from '../iconify/Iconify'
import DropDownInput from './dropDownInput'
import { SimpleInput } from './simpleInput'
import { useRoom } from '../../context/roomContext'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import Filebase from 'react-file-base64'
import toast from 'react-hot-toast';



//******************** */
import 'draft-js/dist/Draft.css';
import { AppTasks } from '../../sections/@dashboard/app'
import RoomFeacher from './roomFeacher'
import { AddFeacher, AddImage, GetSingelRoom, RemoveFeacher,RemoveImage, UpdatesRoom } from '../../redux/slice/roomSlice'
import FullPagespinner from '../spinner/fullPagespinner'
const UpdateRoom = ( ) => {
    const [loading, setLoading ] = React.useState(true);
    const {singelRoom,Rloading} = useSelector((state)=>state.room)
    const {room,setRoom,DeleteFeacher} = useRoom();
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(room.description ?? '')))
        );
//
const ImagesSection = ({images}) => (
    <>
        <div className='grid grid-cols-2 md:grid-cols-4   gap-3 mt-10'>
            {
                images.map((image, index) => (
                    <div key={index} className='relative'>
                        <img className='w-60 h-60 border-2 object-cover' src={image.url} />
                        <MenuItem sx={{ color: 'error.main',position:'absolute',zIndex:999 ,top:10,right:0}}
                                      onClick={()=>{
                                        const  form =  image;
                                        const id =location.state.id;
                                        dispatch(RemoveImage({id,form,toast}))

                                    }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />                             
                        </MenuItem>
                    </div>
                ))
            }
        </div>
    </>
)


  
   const settinData = () => {
         dispatch(GetSingelRoom({id:location.state.id}))
         setRoom(singelRoom);
    }
    React.useEffect(() => {
        settinData();
        if (Rloading) {
            return <FullPagespinner  isloading={Rloading}/>
        }
    }, [GetSingelRoom]);
    
    React.useEffect(()=>{
        settinData();
        console.log(location.state.id);
        if (location.state.id === null || location.state.id === undefined) {
            navigate('/')
        }
        if (Rloading) {
            return <FullPagespinner  isloading={Rloading}/>
        }
    },[])

    const sendData = () => {
        setRoom({...room,description:draftToHtml(convertToRaw(editorState.getCurrentContent()))})
    }
    //
  


  return (
    <div className='container'>        
         <Helmet>
         <meta charset="utf-8" />
         <title> {singelRoom.title ?? 'Update Hotel'} | Hotel luner </title>
        </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update-Room {singelRoom.title}
          </Typography>           
           
          <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} 
          onClick={()=>{
            const form = {
                title: room.title,
                description: room.description,
                roomNumber:room.roomNumber,
                roomType:room.roomType,
                price:room.price,
                maxGuests:room.maxGuests,
                size:room.size,
                totalBed:room.totalBed,
                bedType:room.bedType,

            };         
            console.log(form);
            dispatch(UpdatesRoom({id:singelRoom._id, form,toast,navigate}))
          }}
          >Save</Button>                                  
        </Stack>
      </Container>
        <>                
                <SimpleInput 
                    fullWidth={true}
                    label='Room Title'
                    name='Title'
                    type={'text'}
                    variant='outlined'
                    value={room.title}
                    onChange={(e)=>setRoom({...room,title:e.target.value})} 
                />   
                <Stack  sx={{
                    flexDirection:{
                        xs:'column',
                        sm:'column',
                        md:'row',
                        lg:'row',
                        xl:'row'
                    }
                }}>
                    <SimpleInput 
                        fullWidth={true}
                        label='Room roomNumber'
                        name='roomNumber'
                        type={'Number'}
                        variant='outlined'
                        value={room.roomNumber}
                        onChange={(e)=>setRoom({...room,roomNumber:e.target.value})} 
                    /> 
                    <Box 
                    sx={{
                        height:'20px',
                        width:'20px'
                    }}
                    />
                    <SimpleInput 
                        fullWidth={true}
                        label='Maximum Geusts'
                        name='maxGuests'
                        type={'Number'}
                        variant='outlined'
                        value={room.maxGuests}
                        onChange={(e)=>setRoom({...room,maxGuests:e.target.value})} 
                    /> 
                </Stack>      
                <Stack  sx={{
                        flexDirection:{
                            xs:'column',
                            sm:'column',
                            md:'row',
                            lg:'row',
                            xl:'row'
                        }
                    }}>
                    <SimpleInput 
                        fullWidth={true}
                        label='Room price'
                        name='price'
                        type={'Number'}
                        variant='outlined'
                        value={room.price}
                        onChange={(e)=>setRoom({...room,price:e.target.value})} 
                    /> 
                    <Box 
                    sx={{
                        height:'20px',
                        width:'20px'
                    }}
                    />
                    <DropDownInput
                        setval={(e)=>{
                            setRoom({...room,roomType:e.target.value}) 
                        }}
                        label={"Room Type"}
                        defaultValues={room.roomType}
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
                </Stack>    
                <Stack
                    sx={{
                        flexDirection:{
                            xs:'column',
                            sm:'column',
                            md:'row',
                            lg:'row',
                            xl:'row'
                        }
                    }}>
                    <DropDownInput
                    defaultValue={room.bedType}
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
                     <Box 
                    sx={{
                        height:'20px',
                        width:'20px'
                    }}
                    />
                    <DropDownInput
                        defaultValue={room.totalBed}
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
                    </Stack>         
                <div className='spacy-y-4'>
                    <Typography variant='h6'>
                        Room Description
                    </Typography>
                    <Editor              
                        editorState={editorState}
                        onEditorStateChange={(editorState)=>{setEditorState(editorState); sendData()}}                        
                        toolbarClassName="toolbarClassName d"
                        wrapperClassName="wrapperClassName d"
                        editorClassName="border-2  px-2 overflow-scroll min-h-[200px]"
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker','emoji'],
                            inline: {
                                inDropdown: false,
                            },              
                        }}
                    /> 

                   
                   
                    
                </div> 
                <div className='spacy-y-4'>
                    <Typography variant='h6'>
                        Add Images
                    </Typography>
                   <Stack sx={{
                    flexDirection:{
                        xs:'column',
                        sm:'column',
                        md:'row',
                        lg:'row',
                        xl:'row'
                    },
                    justifyContent:'space-between',
                }}>
                        <Alert>
                            <AlertTitle>
                                You need to add Image one by one
                            </AlertTitle>
                        </Alert>
                        <Button variant="outlined"  className="w-auto"  >
                            <Filebase 
                            onDone={async ({base64}) =>{
                            const form ={
                            file: base64,
                            }
                            // console.log(form.file);
                            dispatch(AddImage({id:location.state.id, form,toast}))
                            }}
                            />
                        </Button>
                   </Stack>
                    <ImagesSection images={singelRoom.img ?? []} />
                </div>  
                <div className='spacy-y-4'>
                    <div className='flex justify-between items-center'>
                        <Typography variant='h6'>
                        Room Feacher
                        </Typography>
                        <RoomFeacher

                        data={singelRoom.roomFeature ?? []}
                        widget={
                            <Button variant="outlined"  startIcon={<Iconify icon="eva:plus-fill" />} className="w-auto"  >Add New Feacher</Button>
                        }           
                        Fun={(data)=>{
                            const form = data;
                            const id = room._id;
                            dispatch(AddFeacher({id,form,toast}))
                        }}
                        />                              
                    </div>   
                    <>
                        <AppTasks
                        title="Edit Room"
                        subheader={"You can delete Feacher from hare"}
                        list={singelRoom.roomFeature ?? []}   
                        handleDelete={(data)=>{
                            const form = {
                                nId:data._id,
                            };
                            const id = room._id;
                          
                            dispatch(RemoveFeacher({id,form,toast}))
                            DeleteFeacher(data.name);

                        }}                
                        />
                    </> 
                </div>             
        </>
    </div>
  )




}


export default UpdateRoom
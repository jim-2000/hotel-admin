import { Alert, AlertTitle, Avatar, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Iconify from '../iconify/Iconify'
import SimpleModal from '../modalBox/simpleModal'
import DropDownInput from './dropDownInput'
import { SimpleInput } from './simpleInput'
import { useRoom } from '../../context/roomContext'
 
const CreateUpdateRoom = ({isupdate=false,data },...props) => {
    const {room,setRoom} = useRoom();
  
   const settinData = () => {
         if(isupdate){
            setRoom({...room,...data});
         }
  }
    React.useEffect(() => {
        settinData();
        console.log(room);
    }, [data]);
    // const {email,phone,name,img,jobtitle,sallary} = data ?? {};
 
    // const [nemail, setEmail] = React.useState(email ?? '');
    // const [nphone, setPhone] = React.useState(phone ?? '');
    // const [nname, setname] = React.useState(name ?? '');
    // const [njobtitle, setJobtitle] = React.useState(jobtitle ?? '');
    // const [nsallary, setSellary] = React.useState(sallary?? '');
    // const [nimg, setImg] = React.useState(img ?? '');
    // const [nrole, setRole] = React.useState('employe' ?? '');
    // const form ={
    //     email:nemail,
    //     phone:nphone,
    //     name:nname,
    //     img:nimg,
    //     jobtitle:njobtitle,
    //     role:nrole    , 
    //     sallary:nsallary,   
    // }
  return (
    <div>        
        <SimpleModal
        description={isupdate ? 'Update Room' : 'Create new Room'}
        title={'Room Form'}
        handleOk={()=>{
            console.log(room);
        }}
        openwidget={ isupdate ? <Iconify icon='bx:bxs-edit' /> : <Button variant='outlined' color='info'>Add New Room</Button> } 
        widget={
            <>
                <Stack direction={"row"}>
                    <Avatar alt={room.title} src={room.img[0]} className='my-4' sx={{ width: 56, height: 56 }} />
                    {
                    isupdate ? <Iconify icon='material-symbols:settings' color="red" /> : null
                    }
                </Stack>
                <SimpleInput 
                    fullWidth={true}
                    label='Room Title'
                    name='Title'
                    type={'text'}
                    variant='outlined'
                    value={room.title}
                    onChange={(e)=>setRoom({...room,title:e.target.value})} 
                />
                    
                <div className='w-full   bg-slate-300 border-2' >
                
                </div>
                {/*
                <SimpleInput 
                    fullWidth={true}
                    label='Description'
                    name='Description'
                    type={'text'}
                    variant='outlined'
                    value={room.description}
                    onChange={(e)=>setRoom({...room,description:e.target.value}) }                    
                />
                <SimpleInput 
                    fullWidth={true}
                    label='Email'
                    name='email'
                    type={'email'}
                    variant='outlined'
                    value={nemail}
                    onChange={(e)=>setEmail(e.target.value)} 
                />
                <SimpleInput 
                    fullWidth={true}
                    label='Phone'
                    name='phone'
                    type={'text'}
                    variant='outlined'
                    value={nphone}
                    onChange={(e)=>setPhone(e.target.value)}                    
                />
                <SimpleInput 
                    fullWidth={false}
                    label='Sallary'
                    name='sallary'
                    type={'number'}
                    variant='outlined'
                    value={nsallary}
                    onChange={(e)=>setSellary(e.target.value)} 
                /> */}
                {/* <Stack direction={"row"} spacing={2} marginY={3}>
               { 
               isupdate ?  (
                <DropDownInput label={"Employe Role"} mapData={['user','admin','employe']} val={nrole} setval={setRole} /> 
               )
               : (
                    <Alert severity="info">
                        <AlertTitle>Role</AlertTitle>
                        Your Role is — <strong>{nrole}</strong>
                    </Alert>
                )
                }
                </Stack> */}
            </>
        }

        />
    </div>
  )
}

export default CreateUpdateRoom
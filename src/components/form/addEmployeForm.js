import { Alert, AlertTitle, Avatar, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Iconify from '../iconify/Iconify'
import SimpleModal from '../modalBox/simpleModal'
import DropDownInput from './dropDownInput'
import { SimpleInput } from './simpleInput'
import { useDispatch } from 'react-redux'
import { CreateEmployee, UpdateEmployee } from '../../redux/slice/employeSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddEmployeForm = ({isupdate=false,data },...props) => {
    const {email,phone,name,img,jobtitle,sallary,_id} = data ?? {};
    const [nemail, setEmail] = React.useState(email ?? '');
    const [nphone, setPhone] = React.useState(phone ?? '');
    const [nname, setname] = React.useState(name ?? '');
    const [njobtitle, setJobtitle] = React.useState(jobtitle ?? '');
    const [nsallary, setSellary] = React.useState(sallary?? '');
    const [nimg, setImg] = React.useState(img ?? '');
    const [nrole, setRole] = React.useState('employe' ?? '');
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const form ={
        email:nemail,
        phone:nphone,
        name:nname,
        img:nimg,
        jobtitle:njobtitle,
        role:nrole    , 
        sallary:nsallary,   
    }

  return (
    <div>        
        <SimpleModal
        description={isupdate ? 'Update Employe' : 'Add new employe'}
        title={'Add Employe'}
        handleOk={()=>{
            if(!isupdate){
                dispatch(CreateEmployee({form,toast,navigator}))
            }
            const id =data._id;
            dispatch(UpdateEmployee({id,form,toast}))
        }}
        openwidget={ isupdate ? <Iconify icon='bx:bxs-edit' /> : <Button variant='outlined' color='info'>Add Employe</Button> } 
        widget={
            <>
                <Stack direction={"row"}>
                    <Avatar alt={name} src={nimg} className='my-4' sx={{ width: 56, height: 56 }} />
                    {
                    isupdate ? <Iconify icon='material-symbols:settings' color="red" /> : null
                    }
                </Stack>
                <SimpleInput 
                    fullWidth={true}
                    label='Job Title'
                    name='jobTitle'
                    type={'text'}
                    variant='outlined'
                    value={njobtitle}
                    onChange={(e)=>setJobtitle(e.target.value)} 
                />
                
                <SimpleInput 
                    fullWidth={true}
                    label='Name'
                    name='name'
                    type={'text'}
                    variant='outlined'
                    value={nname}
                    onChange={(e)=>setname(e.target.value)}                    
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
                />
              
                <Stack direction={"row"} spacing={2} marginY={3}>
               { 
               isupdate ?  (
                <DropDownInput label={"Role"}
                 mapData={
                    [
                    {
                        'name':'user',
                        'value':'user',
                    },
                    {
                        'name':'admin',
                        'value':'admin',
                    },
                    {
                        'name':'employe',
                        'value':'employe',
                    },
                    ]
                } 
                val={nrole} setval={setRole} /> 
               )
               : (
                    <Alert severity="info">
                        <AlertTitle>Role</AlertTitle>
                        Your Role is — <strong>{nrole}</strong>
                    </Alert>
                )
                }
                </Stack>
            </>
        }

        />
    </div>
  )
}

export default AddEmployeForm
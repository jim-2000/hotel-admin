import * as React from 'react';
import FileBase from "react-file-base64";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar,Stack, Typography } from '@mui/material';
import { SimpleInput } from '../form/simpleInput';
import { useDispatch, useSelector } from 'react-redux';
 import { createUser, fetchUser } from '../../redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function FormDialog({widget ,data , isupdate=false,onFun=()=>{}}) {

  const { users } = useSelector((state) => state.user);
  const  {email,phone,username,img} = data;     
  const [open, setOpen] = React.useState(false); 
  const [nemail, setEmail] = React.useState(email ?? '');
  const [nphone, setPhone] = React.useState(phone ?? '');
  const [nusername, setUsername] = React.useState(username ?? '');
  const [nimg, setImg] = React.useState(img ?? 'https://via.placeholder.com/150');
  const [password, setPassword] = React.useState(`bangladesh123456`);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setPhone('');
    setUsername('');
    setImg('');    
  };

  return (
    <div>
        {
            widget === 'button' ?( <Button variant="outlined" onClick={handleClickOpen}>Open</Button>) :( <div onClick={handleClickOpen}>{widget}</div>)
        }
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {
              isupdate ? 'Update User' : 'Add new User'
          }
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
           Please Update your email address
          </DialogContentText>           */}
          <Avatar alt={username} src={nimg} className='my-4' sx={{ width: 56, height: 56 }} />
          <SimpleInput 
          label={"Enter your Username"}
          name={"username"}
          type={"text"}
          fullWidth={true}
          error={false}
          value={nusername}
          onChange={(e)=>{setUsername(e.target.value)}}
            />
          <SimpleInput 
          label={"Email Address"}
          name={"email"}
          type={"email"}
          fullWidth={true}
          error={false}
          value={nemail}
          onChange={(e)=>{setEmail(e.target.value)}}
            />
          {
            isupdate ? null : (
              <SimpleInput 
          label={"Your Password"}
          name={"password"}
          type={"text"}
          fullWidth={true}
          error={false}
          value={password}
          onChange={(e)=>{setPhone(e.target.value)}}
          />
            )
          }
          <SimpleInput 
          label={"Phone Number"}
          name={"phone"}
          type={"phone"}
          fullWidth={true}
          error={false}
          value={nphone}
          onChange={(e)=>{setPhone(e.target.value)}}
          />
          <Typography>
            {  isupdate ?   "Update your profile picture" : "Add your profile picture" }
          </Typography>
         
                <Stack direction={"column-reverse"} spacing={2}>
                 <FileBase 
                  key={"imageFile"}
                  name={"imageFile"}
                  
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>{
                      setImg( base64 )                    
                      }                        
                    }
                  />
                <img src={nimg} alt={nusername} className='h-60 w-full py-2 bg-cover bg-fixed' />   
                </Stack>            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Cancel</Button>
          <Button onClick={()=>{
            const form ={
              username:nusername,
              email:nemail,
              phone:'01552354022',
              password: nemail+'123456',
              // img:nimg,  
            }        
           
            if (!isupdate) {
              dispatch(createUser({form,toast}))              
            }
            onFun(form);
            
            handleClose();
                    
          }} color='success' variant='outlined' >{isupdate ? 'update' : 'Create'  }</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

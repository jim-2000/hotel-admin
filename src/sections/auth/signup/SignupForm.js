import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
 
import {ADMINSIGNUP, LOGIN} from '../../../redux/slice/authSlice'

// ----------------------------------------------------------------------

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [rememberMe, setrememberMe] = useState(true);

  const dispatch = useDispatch();

  const {user,setUserLoginData} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (email && password && username && phone ) {      
        let form = {
            username: username.trim(),
            email: email.trim(),
            password: password.trim(),
            phone:phone.trim(),
          }
          if (rememberMe) {
            localStorage.setItem('userAuth',JSON.stringify(form))
          }
          dispatch(ADMINSIGNUP({form,toast,navigate}));      
    }
    else {
        toast.error('Please enter your username email and password');   
     
    }

    // navigate('/dashboard', { replace: true });
  };

 
  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="User Name" onChange={(e)=>setUsername(e.target.value)} value={username} />
        <TextField name="email" label="Email address" onChange={(e)=>setEmail(e.target.value)} value={email} />
        <TextField name="phone" label="Your Phone" onChange={(e)=>setphone(e.target.value)} value={phone} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e)=>setPassword(e.target.value)}     
          value={ password}    
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Checkbox name="remember" 
          value={rememberMe}
          label="Remember me" 
          onChange={(y)=>setrememberMe(y.target.checked)}        
          />
          <Typography variant='body2' color={rememberMe ? 'InfoText' : 'GrayText'}>
            Remember me
          </Typography>
        </Stack>     
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="outlined" onClick={handleClick}>
        Singup
      </LoadingButton>
    </>
  );
}

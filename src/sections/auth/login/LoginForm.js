import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
 
import {LOGIN} from '../../../redux/slice/authSlice'

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [rememberMe, setrememberMe] = useState(true);

  const dispatch = useDispatch();

  const {user,setUserLoginData} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (email === '' || password === '') {      
      toast.error('Please enter your email and password');   
      // alert("email, password");
    }
    else {
      let form = {
        email: email,
        password: password,
      }
      if (rememberMe) {
        localStorage.setItem('userAuth',JSON.stringify(form))
      }
      dispatch(LOGIN({form,toast,navigate}));      
    }

    // navigate('/dashboard', { replace: true });
  };

  useEffect(()=>{
    const form = JSON.parse(localStorage.getItem('userAuth'));
    if(form){      
      console.log(form.email);
      setEmail(form.email)
      setPassword(form.password)    
      setrememberMe(true)  
      dispatch(LOGIN({form,toast,navigate}))
    }
  },[])

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e)=>setEmail(e.target.value)} value={email} />
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
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="outlined" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

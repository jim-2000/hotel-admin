import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const RedirectPage = () => {
    const [count, setCount] = React.useState(5)
    const navigate = useNavigate();
  //
 React.useEffect(()=>{
    const interval = setInterval(() => {
        setCount((p)=>--p);
    }, 1000);
    count === 0 && navigate("/login", { replace: true })
    return ()=> clearInterval(interval);
},[count,navigate])
  return (
    <>
      <Helmet>
        <title> You are Not authenticated | Hotel Luner </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
     
          <Typography variant="h5" paragraph>
            Sorry, you are Not authorized user
          </Typography>    
         
          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 200, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
         <Typography variant="h3" paragraph>
          Redirecting you in <span className='text-teal text-2xl'>{count}</span> in login page
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
}

export default RedirectPage
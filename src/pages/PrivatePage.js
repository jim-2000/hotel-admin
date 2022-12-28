import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import RedirectPage from './redirectPage';
import { useEffect, useState } from 'react';

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

export default function PrivatePage({children}) { 
    const {user} = useSelector((state)=>state.auth);   
 
 

   return user ? children : <RedirectPage />
}

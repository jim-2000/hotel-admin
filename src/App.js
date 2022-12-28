import toast, { Toaster } from 'react-hot-toast';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';

import { StyledChart } from './components/chart';

import { RoomProvider } from './context/roomContext';

import { HotelProvider, useHotel } from './context/hotelContext';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/slice/authSlice';
import AuthRoute from './authroutes';
import { getHotel } from './redux/slice/hotelSlice';
// ----------------------------------------------------------------------

export default function App() {
 
  const dispatch = useDispatch()
  const Isuser = JSON.parse(localStorage.getItem('admin'))
  useEffect(()=>{
    dispatch(getHotel());
    if (Isuser) {
      dispatch(
        setUser(Isuser.user)        
      )
    dispatch(getHotel());
    }
  },[Isuser])
  return (
    <ThemeProvider>
      <HotelProvider>
        <RoomProvider>
          <ScrollToTop />
          <StyledChart />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}     
          />
            <Router />

          {/* {
            Isuser ?
            <Router />
            : <AuthRoute />
          } */}
        </RoomProvider>
      </HotelProvider>
    </ThemeProvider>
  );
}

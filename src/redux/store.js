import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice' 
import bookSlice from './slice/bookinSlice' 
import hotelSlice from './slice/hotelSlice' 
import userSlice from './slice/UserSlice' 
import employeSlice from './slice/employeSlice'

export default configureStore({
    reducer: {
        auth:authSlice ,
        user: userSlice,
        employe: employeSlice,
        hotel: hotelSlice,
        book: bookSlice,
    },
    
});
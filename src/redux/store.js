import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice' 
import bookSlice from './slice/bookinSlice' 
import hotelSlice from './slice/hotelSlice' 
import userSlice from './slice/UserSlice' 
import employeSlice from './slice/employeSlice'
import roomSlice from './slice/roomSlice';

export default configureStore({
    reducer: {
        auth:authSlice ,
        user: userSlice,
        employe: employeSlice,
        hotel: hotelSlice,
        book: bookSlice,
        room:roomSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            // add other middlewares here
        })
    
});
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'


// get all booking
export const getAllBookings = createAsyncThunk(
    'booking/getAllBookings',
    async (toast,{rejectWithValue})=>{
       try {
        const response = await api.ApiGetAllBookings()
        return response.data;
       } catch (error) {
        toast.error('something went wrong');
        rejectWithValue(error);
       }
    }
)

export const BookNow = createAsyncThunk(
    'booking/BookNow',
    async ({toast,form},{rejectWithValue})=>{
        try {
            const response = await api.ApiGetBooked(form);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error);
        }
    }
)


//
const initialState = {
    Booking: [],
    CencellBooking: [],
    pendingBooking: [],
    singelbooking:{},
    error:'',
    Bloading:false,
}
//
const bookSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getAllBookings.pending,(state,action)=>{
            state.Bloading= true;
        })
        builder.addCase(getAllBookings.fulfilled,(state,action)=>{
            state.Bloading= false;
            state.Booking = action.payload['result'];
        })
        builder.addCase(getAllBookings.rejected,(state,action)=>{
            state.Bloading= false;
            state.error = 'something went wrong';
        })
    }
})

export default  bookSlice.reducer;
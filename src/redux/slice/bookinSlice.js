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
        console.log(error);
        toast.error('something went wrong');
        rejectWithValue(error);
       }
    }
)

export const BookNow = createAsyncThunk(
    'booking/BookNow',
    async ({toast,form,navigate},{rejectWithValue})=>{
        try {
            const response = await api.ApiGetBooked(form).then((res)=>{
                toast.success("Success Booked")
                navigate('/dashboard/booking')
            })
            return response;
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            rejectWithValue(error);
        }
    }
)
//
export const RemoveBooked = createAsyncThunk(
    'booking/deleteBooked',
    async ({id, toast},{rejectWithValue,dispatch})=>{
       try {
        const response = await api.ApiDeleteBooked(id).then((res)=>{
            toast.success("Success Fully Removed Booked");
            dispatch(getAllBookings(toast))
        })
        return response;
       } catch (error) {
        console.log(error);

        toast.error('something went wrong');
        rejectWithValue(error);
       }
    }
)
//
export const ConfirmBooked = createAsyncThunk(
    'booking/ConfirmBooked',
    async ({id, toast},{rejectWithValue,dispatch})=>{
       try {
        const response = await api.ApiConfirmBooked(id).then((res)=>{
            toast.success("Success Fully Confirmed");
            dispatch(getAllBookings(toast))
        })
        return response;
       } catch (error) {
        console.log(error);

        toast.error('something went wrong');
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
            state.Booking = action.payload['book'];
            state.pendingBooking = action.payload['confirm'];
            state.CencellBooking = action.payload['cenCelled'];
        })
        builder.addCase(getAllBookings.rejected,(state,action)=>{
            state.Bloading= false;
            state.error = 'something went wrong';
        })
        builder.addCase(BookNow.pending,(state,action)=>{
            state.Bloading= true;
        })
        builder.addCase(BookNow.fulfilled,(state,action)=>{
            state.Bloading= false;             
        })
        builder.addCase(BookNow.rejected,(state,action)=>{
            state.Bloading= false;
            state.error = 'something went wrong';
        })
        builder.addCase(RemoveBooked.pending,(state,action)=>{
            state.Bloading= true;
        })
        builder.addCase(RemoveBooked.fulfilled,(state,action)=>{
            state.Bloading= false;     
        })
        builder.addCase(RemoveBooked.rejected,(state,action)=>{
            state.Bloading= false;
            state.error = 'something went wrong';
        })
        builder.addCase(ConfirmBooked.pending,(state,action)=>{
            state.Bloading= true;
        })
        builder.addCase(ConfirmBooked.fulfilled,(state,action)=>{
            state.Bloading= false;     
        })
        builder.addCase(ConfirmBooked.rejected,(state,action)=>{
            state.Bloading= false;
            state.error = 'something went wrong';
        })
    }
})

export default  bookSlice.reducer;
import * as api from '../api'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


export const  Allroom = createAsyncThunk(
    'room/getallroom',
    async (toast,{rejectWithValue})=>{
        try {
            const response = await api.ApiGetAllRoom();
            
            return response.data;
        } catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)
export const  GetSingelRoom = createAsyncThunk(
    'room/getSingelRoom',
    async ({id,toast},{rejectWithValue})=>{
        try {
            const response = await api.ApiGetSingelRoom(id);
            // toast.success("Success");
            return response.data;
        } catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const  Createroom = createAsyncThunk(
    'room/createRoom',
    async ({form, toast,navigate},{rejectWithValue})=>{
        try {
            const response = await api.ApiCreteRoom(form);
           toast.success('Room created successfully')
           if (response.data ) {
            navigate('/dashboard/room')
           }
            return response.data;
        } catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const  UpdatesRoom = createAsyncThunk(
    'room/updateRoom',
    async ({id,form,toast,navigate},{rejectWithValue,dispatch})=>{
        try {
            const response = await api.ApiUpdateRoom(id,form).then((response) => {
                toast.success('Room updated successfully')                
                return response.data;
            }).finally(()=>{
                // dispatch(GetSingelRoom({id:id}))
                navigate('/dashboard/room')
            });

        }catch (error){
            console.log(error);
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const DeleteRoom = createAsyncThunk(
    'room/deleteRoom',
    async ({id,toast},{rejectWithValue,dispatch})=>{
        try {
            const response = await api.ApiDeleteRoom(id);
            dispatch(Allroom(toast))
            return response.data;
        } catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const AddFeacher = createAsyncThunk(
    'room/addFeacher',
    async ({id, form,toast},{rejectWithValue,dispatch})=>{
        try {
            const response = await api.ApiAddRoomFeacher(id,form)
            dispatch(GetSingelRoom({id:id}))
            toast.success('Feacher added successfully')
            return response.data;
        } catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)
export const RemoveFeacher = createAsyncThunk(
    'room/removeFeacher',
    async ({id, form,toast},{rejectWithValue,dispatch})=>{
        console.log(id,form);
        try {
            const response = await api.ApiRemoveRoomFeacher(id,form)
            dispatch(GetSingelRoom({id:id}))
            toast.success('Feacher Removed successfully')
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const AddImage = createAsyncThunk(
    'room/addImage',
    async ({id,form,toast},{rejectWithValue,dispatch})=>{
        try {
            const response = await api.ApiAddRoomImg(id,form).then((res)=>{
                toast.success('Image added successfully')
                dispatch(GetSingelRoom({id:id}))
            })            
            return response;
        }catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

export const RemoveImage = createAsyncThunk(
    'room/removeImage',
    async ({id,form,toast},{rejectWithValue,dispatch})=>{
        try {
            const response = await api.ApiRemoveRoomImg(id,form).then((res)=>{               
                toast.success('Image Removed successfully')
            }).finally(()=>{
                dispatch(GetSingelRoom({id:id}))
            })
            return response;           
        }catch (error) {
            toast.error('Somethign went wrong log in again')
            rejectWithValue(error)
        }
    }
)

//
const initialState = {
    rooms: [],
    singelRoom:{},
    Rerror:'',
    Rloading:false,   
    bookRoom:{},
}
//
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: { 
        SelectRoomById:(state,action)=>{
           state.bookRoom = state.rooms.find((room)=>room._id === action.payload)
        }       
    },
    extraReducers: (builder) => {
        builder.addCase(UpdatesRoom.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(UpdatesRoom.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(UpdatesRoom.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(RemoveImage.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(RemoveImage.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(RemoveImage.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(AddImage.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(AddImage.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(AddImage.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(AddFeacher.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(AddFeacher.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(AddFeacher.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(RemoveFeacher.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(RemoveFeacher.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(RemoveFeacher.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(DeleteRoom.fulfilled,(state,action) => {           
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(DeleteRoom.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror = action.error.message;
        })
        builder.addCase(GetSingelRoom.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(GetSingelRoom.fulfilled,(state,action) => {
            state.singelRoom = action.payload;
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(GetSingelRoom.rejected,(state,action) => {
            state.Rloading = false;
        })
        builder.addCase(Allroom.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(Allroom.fulfilled,(state,action) => {
            state.rooms = action.payload;
            state.Rerror = '';
            state.Rloading = false;
        })
        builder.addCase(Allroom.rejected,(state,action) => {
            state.Rloading = false;
        })
        builder.addCase(Createroom.pending,(state,action) => {
            state.Rloading = true;
        })
        builder.addCase(Createroom.fulfilled,(state,action) => {
            state.rooms = [action.payload];           
        })
        builder.addCase(Createroom.rejected,(state,action) => {
            state.Rloading = false;
            state.Rerror= action.payload;
        })
    }
})

export const {SelectRoomById}  = roomSlice.actions;

export default  roomSlice.reducer;
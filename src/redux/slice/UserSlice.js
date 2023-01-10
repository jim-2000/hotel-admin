import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const fetchUser = createAsyncThunk(
    'user/fetchUser', 
    async (toast,{rejectWithValue }) => {
    try {
        const response = await  api.ApiGetAllUser();
        toast.success("User fetched successfully")
        return response.data;
    } catch (error) {
        toast.success("Something went wrong Please log in again")
        return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({form,navigate},{rejectWithValue}) => {
        try {
            const response = await api.ApiCreateUser(form);        
            navigate('/user');
            return response.data;
        } catch (error) {
            console.warn(error);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    users: [],
    uerror:'',
    umessage:'',
    uLoading: false,
}
//
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     
        sortuser : (state,action) => {
            const {sort} = action.payload;
            if(sort === 'asc'){
                state.users.sort((a,b) => a.username.localeCompare(b.username));
            }else{
                state.users.sort((a,b) => b.username.localeCompare(a.username));
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.uLoading = true;            
        })
        builder.addCase(fetchUser.fulfilled, (state,action) => {
            state.uLoading = false;
            state.users = action.payload;
            state.uerror = '';
            state.umessage = '';
        })
        builder.addCase(fetchUser.rejected, (state,action) => {
            state.uLoading = false;
            state.uerror = action.payload.message;
        })
        builder.addCase(createUser.pending, (state) => {
            state.uLoading = true;            
        })
        builder.addCase(createUser.fulfilled, (state,action) => {
            state.uLoading = false;
            state.users = [action.payload];
            state.uerror = '';
            state.umessage = '';
        })
        builder.addCase(createUser.rejected, (state,action) => {
            state.uLoading = false;
            state.uerror = action.payload.message;
        })
    }
})

export const selectUser = (state) => state.user.user;

export const {sortuser} = userSlice.actions;

export default  userSlice.reducer;
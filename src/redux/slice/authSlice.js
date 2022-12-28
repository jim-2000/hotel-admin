import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'


export const LOGIN =createAsyncThunk(
    'auth/LOGIN',
    async ({form,toast,navigate}, { rejectWithValue }) => {
      
        try {
            const response = await api.loginAdmin(form);            
                toast.success(response.data['meassage']); 
                if (response.status == 200) {
                    navigate('/dashboard/app', { replace: true });                    
                }          
            return response;
        }catch(e) {
            toast.error(e.response.data['meassage']);
            rejectWithValue(e)
        }
    }
)


//
const initialState = {
    user: null,
    error:'',
    loading:false,
    isAuth:false,
    message:'',
}
//
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },        
        setUserLoginData: (state, action) => {
            localStorage.setItem('userAuth', JSON.stringify(action.payload));
        },

    },
    extraReducers: (builder) => {
        builder.addCase(LOGIN.fulfilled, (state, action) => {
            localStorage.setItem('admin',JSON.stringify({...action.payload.data}))
            state.user = action.payload.data['user'];
            state.isAuth = true;
            state.loading = false;
            state.error = '';
        })
        builder.addCase(LOGIN.rejected, (state, action) => {
            state.user = null;
            state.isAuth = false;
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(LOGIN.pending, (state, action) => {
            state.user = null;
            state.isAuth = false;
            state.loading = true;
            state.error = '';
        })
        
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
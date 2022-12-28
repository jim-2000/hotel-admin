import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error:'',
    loading:false,
    isAuth:false,
    message:'',
}
//
const bookSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
})

export default  bookSlice.reducer;
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async (_,{rejectWithValue}) => {
    try {
        const { data } = await api.ApiGetAllEmploye();
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// initial state
const initialState = {
    employees: [],
    employe: {},
    status: null,
    error: null,
    eloading: false    
} 

// slice
const employeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getEmployees.pending, (state, action) => {
            state.status = 'loading'
            state.eloading = true
        })
        .addCase(getEmployees.fulfilled, (state, action) => {
            state.status = 'success'
            state.employees = action.payload
            state.eloading = false
        })
        .addCase(getEmployees.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.eloading = false
        })
    }
})

export default employeSlice.reducer
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

export const CreateEmployee = createAsyncThunk(
    'employees/CreateEmployee',
    async ({form,toast,navigator},{rejectWithValue,dispatch}) => {
    try {
        const response = await api.ApiCreateEmploye(form).then((res)=>{
            dispatch(getEmployees())
            toast.success('Employee created');
        })
        // navigator('/dashboard/employe')
        return response;
    } catch (error) {
        toast.success('something went wrong');
        return rejectWithValue(error.response.data);
    }
})
export const UpdateEmployee = createAsyncThunk(
    'employees/UpdateEmployee',
    async ({id, form,toast},{rejectWithValue,dispatch}) => {
    try {
        const response = await api.ApiUpdateEmploye(id,form).then((res)=>{
            dispatch(getEmployees())
            toast.success('Employee updated');
        })
        // navigator('/dashboard/employe')
        return response;
    } catch (error) {
        toast.success('something went wrong');
        return rejectWithValue(error.response.data);
    }
})

export const DelteEmploye = createAsyncThunk(
    'employees/deleteEmployee',
    async ({id, toast},{rejectWithValue,dispatch}) => {
    try {
        const response = await api.ApiDeleteEmploye(id).then((res)=>{
            dispatch(getEmployees())
            toast.success('Employee Deleted');
        })
        // navigator('/dashboard/employe')
        return response;
    } catch (error) {
        toast.success('something went wrong');
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
        .addCase(CreateEmployee.pending, (state, action) => {
            state.status = 'loading'
            state.eloading = true
        })
        .addCase(CreateEmployee.fulfilled, (state, action) => {
            state.status = 'success'
            state.employees = action.payload
            state.eloading = false
        })
        .addCase(CreateEmployee.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.eloading = false
        })
        .addCase(DelteEmploye.pending, (state, action) => {
            state.status = 'loading'
            state.eloading = true
        })
        .addCase(DelteEmploye.fulfilled, (state, action) => {
            state.status = 'success'       
            state.eloading = false
        })
        .addCase(DelteEmploye.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.eloading = false
        })
    }
})

export default employeSlice.reducer
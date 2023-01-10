import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'


// get all hotel
export const getAllHotels = createAsyncThunk(
    'hotel/getAllHotels',
    async (toast,{rejectWithValue})=>{
        try {
            const response = await api.ApiHotel();
            return response.data
        } catch (error) {
            toast.error(error);
            rejectWithValue(error);
        }
    }
)

// create hotel
export const createHotel = createAsyncThunk(
    'hotel/createHotel',
    async ({hotel,tag}, { rejectWithValue }) => {
       try {
        const response = await api.ApiCreateHotel(hotel)
    
        return response.data;
       } catch (error) {
        rejectWithValue(error)        
       }
    })

// get hotel
export const getHotel = createAsyncThunk(
    'hotels/getHotel', 
    async (_, {rejectWithValue}) => {
         try {
            const response = await api.ApiGetMyHotel();
            return response;       
         } catch (error) {
            rejectWithValue(error)
         }
    });
// update hotel

export const updateHotel = createAsyncThunk(
    'hotels/updateHotel', 
    async ({form,toast}, {rejectWithValue,dispatch,}) => { 
        try {
            const response = await api.ApiupdateHotel(form);
            toast.success(response.data);
            dispatch(getHotel());            
            return response;
        } catch (error) {
            toast.error(error.message);
            rejectWithValue(error)
        }
    }
)
//
export const addNearBy = createAsyncThunk(
    'hotels/removeNearBy',
    async ({id,form,toast,navigate}, {rejectWithValue,dispatch}) => {
        try {
            const response = await api.ApiAddNearbyHotel(id,form);
            dispatch(getHotel())
            toast.success(response.data);         
            return response;
        }catch (error) {
            toast.error(error.message);
            rejectWithValue(error)
        }
    }
        
)

//
export const removeNearBy = createAsyncThunk(
    'hotels/removeNearBy',
    async ({id,form,toast}, {rejectWithValue,dispatch}) => {
        try {
            const response = await api.ApiRemoveNearbyHotel(id,form);
            dispatch(getHotel())
            toast.error(response.data)
            return response;
        }catch (error) {
            rejectWithValue(error)
        }
    }
        
)
//
export const addFaq = createAsyncThunk(
    'hotels/addFaq',
    async ({id,form,toast,navigate}, {rejectWithValue,dispatch}) => {
        try {
            const response = await api.ApiAddFaqbyHotel(id,form);
            dispatch(getHotel())
            toast.success(response.data);         
            return response;
        }catch (error) {
            toast.error(error.message);
            rejectWithValue(error)
        }
    }
)

//

export const removeFaq = createAsyncThunk(
    'hotels/removeFaq',
    async ({id,form,toast}, {rejectWithValue,dispatch}) => {
        try {
            const response = await api.ApiRemoveFaqHotel(id,form);
            dispatch(getHotel())
            toast.error(response.data)
            return response;
        }catch (error) {
            rejectWithValue(error)
        }
    }
)
//
export const removeImage = createAsyncThunk(
    'hotels/removeImage',
    async ({id,form,toast}, {rejectWithValue,dispatch,fulfillWithValue,}) => {
        try {
            const response = await api.ApiRemoveImageHotel(id,form).then((res)=>{
                toast.error(res.data)
                return res;
            }).finally(()=>{
                dispatch(getHotel())
            })
            // toast.error("Image removed after 1 min you may contineo working")
            // return response;
        }catch (error) {
            rejectWithValue(error)
            toast.error(error.messages)

        }
    }
)
//
export const addImage = createAsyncThunk(
    'hotels/addImage',
    async ({id,form,toast,navigate}, {rejectWithValue,dispatch,getState}) => {
        try {
            const response = api.ApiAddImagesHotel(id,form).then((res)=>{
                toast.success(res.data)
                dispatch(getHotel())
            })
            return response;
        } catch (error) {
            toast(error.messages);
            rejectWithValue(error)
        }
    }
)
// api check
export const checkApi = createAsyncThunk(
    'hotels/checkHotel', 
    async (form, {rejectWithValue}) => {
        console.log(typeof form);
        try {
            const response = await api.ApiCheck(form);
            return response;        }
        catch (error) {
            rejectWithValue(error)
        }
    }
)


//>>>>>>>>>>
const initialState = {
    hotels: [],
    myhotel: {},
    Hloading:false, 
    Herror:'',
}
//
const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        Setmyhotel:(state,action)=>{
            console.log(action.payload);
            state.myhotel = action.payload;
        },
        GetMyHotel:(state,action)=>{
            state.myhotel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHotels.pending, (state, action) => {           
            state.Hloading = true;       
            state.Herror = ''; 
        })
        builder.addCase(getAllHotels.fulfilled, (state, action) => {
            state.hotels = action.payload;
        }),
        builder.addCase(getAllHotels.rejected, (state, action) => {
            state.Hloading = false;
            state.Herror= action.payload;
        }),
        builder.addCase(createHotel.fulfilled, (state, action) => {
            state.myhotel = action.payload.data;
            state.Hloading = false;       
            state.Herror = ''; 
        })
        builder.addCase(createHotel.rejected, (state, action) => {
            console.log(action.error.message);     
            state.Hloading = false;
        })
        builder.addCase(createHotel.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(getHotel.fulfilled, (state, action) => {
            state.myhotel = action.payload.data;
            state.Hloading = false;        
        })
        builder.addCase(getHotel.rejected, (state, action) => {
            console.log(action.error.message);     
            state.Hloading = false;
        })
        builder.addCase(getHotel.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(updateHotel.fulfilled, (state, action) => {         
            state.Hloading = false;        
            // state.myhotel = action.payload.data;
        })
        builder.addCase(updateHotel.rejected, (state, action) => {
            console.log(action.error.message);     
            state.Hloading = false;
        })
        builder.addCase(updateHotel.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(addNearBy.fulfilled, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(addNearBy.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(addNearBy.rejected, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(addFaq.fulfilled, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(addFaq.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(addFaq.rejected, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(removeImage.fulfilled, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(removeImage.pending, (state, action) => {
            state.Hloading = true;
        })
        builder.addCase(removeImage.rejected, (state, action) => {
            state.Hloading = false;
        })
        builder.addCase(checkApi.fulfilled, (state, action) => {
            console.log(action.payload);
            // state.myhotel = action.payload.data['result'];
            state.Hloading = false;        
        })
        builder.addCase(checkApi.rejected, (state, action) => {
            console.log(action.error.message);     
            state.Hloading = false;
        })
        builder.addCase(checkApi.pending, (state, action) => {
            state.Hloading = true;
        })
    }
})

export const {Setmyhotel,GetMyHotel} = hotelSlice.actions;

export default  hotelSlice.reducer;
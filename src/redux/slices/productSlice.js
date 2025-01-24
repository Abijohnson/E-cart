import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action return promise
export const fetchProducts = createAsyncThunk("products/fetchProducts",async ()=>{
       const result = await axios.get("https://dummyjson.com/products")
       console.log(result);
       return result.data.products
})
const productSlice = createSlice({
    name:"products",
    initialState:{
        allproducts:[],
        loading:false,
        errorMsg:""
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,apiResult)=>{
            state.allproducts = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.pending,(state,apiResult)=>{
            state.allproducts = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.rejected,(state,apiResult)=>{
            state.allproducts = []
            state.loading = false
            state.errorMsg = "API call failed"
        })
    }
})

export default productSlice.reducer
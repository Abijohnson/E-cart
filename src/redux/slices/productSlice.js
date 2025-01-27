import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action return promise
export const fetchProducts = createAsyncThunk("products/fetchProducts",async ()=>{
       const result = await axios.get("https://dummyjson.com/products")
    //    console.log(result);
       sessionStorage.setItem("allProducts",JSON.stringify(result.data.products))
       return result.data.products
})
const productSlice = createSlice({
    name:"products",
    initialState:{
        allproducts:[],
        dummyAllProducts:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchProduct:(state,actionByHeader)=>{
           state.allproducts =  state.dummyAllProducts.filter(item=>item.title.toLowerCase().
        includes(actionByHeader.payload))
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,apiResult)=>{
            state.allproducts = apiResult.payload
            state.dummyAllProducts =  apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.pending,(state,apiResult)=>{
            state.allproducts = []
            state.dummyAllProducts = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.rejected,(state,apiResult)=>{
            state.allproducts = []
            state.dummyAllProducts = []
            state.loading = false
            state.errorMsg = "API call failed"
        })
    }
})

export const {searchProduct} = productSlice.actions
export default productSlice.reducer
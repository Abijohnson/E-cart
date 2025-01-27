import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cartItems",
    initialState:[],
    reducers:{
        // action-name:reducer function
        addToCart: (state,actionByComponent)=>{
            const existingProduct = state.find(item=>item.id==actionByComponent.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.quantity * existingProduct.price
                const remainingproducts = state.filter(item=>item.id != existingProduct.id)
                state = [...remainingproducts,existingProduct]
            }else{
                state.push({...actionByComponent.payload,quantity:1,
                    totalPrice:actionByComponent.payload.price
                })
            }
        },
        incrementQuantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.quantity * existingProduct.price
                const remainingproducts = state.filter(item=>item.id != existingProduct.id)
                state = [...remainingproducts,existingProduct]
        },
        removeCartItem : (state,actionByCart)=>{
          return state.filter(item=>item.id!=actionByCart.payload)
        },
        decrementQuantity : (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id==actionByCart.payload)
            existingProduct.quantity--
                existingProduct.totalPrice=existingProduct.quantity * existingProduct.price
                const remainingproducts = state.filter(item=>item.id != existingProduct.id)
                state = [...remainingproducts,existingProduct]
        },
        emptyCart : (state)=>{
            return state =[]
        }

    }
})

export const {addToCart,incrementQuantity,removeCartItem,decrementQuantity,emptyCart} = cartSlice.actions
export default cartSlice.reducer
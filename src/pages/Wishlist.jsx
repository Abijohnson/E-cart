import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'



const Wishlist = () => {

  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)

   const handleCart =(product)=>{
    dispatch(removeItem(product.id))
      dispatch(addToCart(product))
      const existingProduct = userCart?.find(item=>item?.id==product.id)
      if(existingProduct){
        alert("Product Quantity Is Incrementing!!!")
  
      }else{
        alert("Product added to cart!!")
      }
    }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='px-5'>
       {
        userWishlist?.length>0?
        <>
        <h1 className='text-4xl font-bold text-red-600'>My Wishlist</h1>
        <div className='grid grid-cols-4 gap-4'>
         {
          userWishlist?.map(product=>(
            <div className='rounded border p-2 shadow'>
            <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
            <div className='text-center'>
              <h3 className='text-x1 font-bold'>{product?.title}</h3>
              <div className='flex justify-evenly mt-5'>
                <button onClick={()=>dispatch(removeItem(product?.id))} className='text-x1'><i class="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
                <button onClick={()=>handleCart(product)} className='text-x1'><i class="fa-solid fa-cart-plus text-green-700"></i></button>
              </div>
            </div>
          </div>
          ))
         }
        </div>
      </>
      :
      <div className='flex justify-center items-center h-screen'>
        <img src="https://bexcart.com/assets/images/empty-cart.gif" alt="" />
        <h1 className='text-3xl text-red-600'>Your Wishlist is empty!!!</h1>
      </div>
       }
      </div>
    </>
  )
}

export default Wishlist
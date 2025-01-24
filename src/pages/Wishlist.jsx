import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'


const Wishlist = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='px-5'>
        <>
          <h1 className='text-4xl font-bold text-red-600'>My Wishlist</h1>
          <div className='grid grid-cols-4 gap-4'>
            <div className='rounded border p-2 shadow'>
              <img width={'100%'} height={'200px'} src="https://images.jdmagicbox.com/quickquotes/images_main/shopping-trolley-65-litre-377162892-qgsve.jpg" alt="" />
              <div className='text-center'>
                <h3 className='text-x1 font-bold'>Product name</h3>
                <div className='flex justify-evenly mt-5'>
                  <button className='text-x1'><i class="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
                  <button className='text-x1'><i class="fa-solid fa-cart-plus text-green-700"></i></button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}

export default Wishlist
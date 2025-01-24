import React from 'react'
import Header from '../components/Header'

const View = () => {
  return (
    <>
      <Header />
      <div className='flex flex-col mx-5'>
        <div className='grid grid-cols-2 items-center h-screen'>
          <img width={'450px'} height={'200px'} src="https://images.jdmagicbox.com/quickquotes/images_main/shopping-trolley-65-litre-377162892-qgsve.jpg" alt="" />
          <div>
            <h3 className='font-bold'>PID : id</h3>
            <h1 className='text-5xl font-bold'>Product Name</h1>
            <h4>Brand : brand</h4>
            <h4>Category : category</h4>
            <p>
              <span className='font-bold'>Description</span>: Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quibusdam dolores natus doloremque, sint corporis omnis! Eveniet error eaque repellat corrupti, 
              incidunt impedit vero neque modi fugiat commodi assumenda quam.
              <div className='flex justify-between mt-5'>
                <button className='bg-blue-600 text-white p-2'>Add to wishlist</button>
                <button className='bg-blue-600 text-white p-2'>Add to Cart</button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default View
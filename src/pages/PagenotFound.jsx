import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
       <div className='w-full h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-3'>
          <div></div>
          <div className='flex justify-center items-center flex-col p-5 md:p-0'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4RAj8SKq2elTkOPz4Y633vvB2nds6FGPsw&s"
             alt="page not found" />
             <p>Oh No!</p>
             <h1 className='md:text-4xl text-2xl'>Look Like You're Lost</h1>
             <h5 className=''>The page you are looking for is not available</h5>
             <Link to={'/'}>
               <button className='mt-4 px-4 py-3 bg-blue-800 text-white rounded hover:border hover:border-blue-800
               hover:bg-white hover:text-blue-800'>Back Home</button>
             </Link>
          </div>
          <div></div>
        </div>
       </div>
    </>
  )
}

export default PagenotFound
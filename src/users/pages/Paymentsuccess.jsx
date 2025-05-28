import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function Paymentsuccess() {
  return (
   <>
   <Header/>
        <div className='container my-10'>
            <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
              <div>
                <h1 className='md:text-4xl text-blue-600'>Congratulations</h1>
                <p className='my-4 text-2xl'>Thankyou for shopping with Bookstore.Hope you have a good time with us</p>
                <Link to={'/all-books'}><button className='bg-blue-900 px-4 py-3 text-white my-5'>Back</button></Link>
              </div>
              <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="no image"
                className='w-full' />
              </div>
            </div>
        </div>
        <Footer/>
   </>
  )
}

export default Paymentsuccess
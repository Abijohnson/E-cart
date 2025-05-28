import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function Paymenterror() {
  return (
    <>
     <Header/>
        <div className='container my-10'>
            <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col'>
              <div>
                <h1 className='md:text-4xl text-red-600'>Sorry your payment is unsuccessfull</h1>
                <p className='my-4 text-2xl'>We apologize for the inconvience caused </p>
                <Link to={'/all-books'}><button className='bg-blue-900 px-4 py-3 text-white my-5'>Back</button></Link>
              </div>
              <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="no image"
                className='w-full' />
              </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Paymenterror
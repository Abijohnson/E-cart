import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'

function Contacts() {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center flex-col md:px-40 px-10'>
                <h1 className='my-5 text-3xl text-center font-medium '>Contacts</h1>
                <p className='md:text-center text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus nobis
                    architecto? Totam natus quo placeat corrupti! Ex, nihil distinctio delectus tempora modi
                    dolorem. Temporibus fuga numquam dolores earum atque.</p>
            </div>
            <div className='grid grid-cols-3 mt-8'>
                <div className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faLocationDot} className='bg-gray-300 border rounded-3xl p-2 text-2xl' />
                    <p className='mx-2'>123 Main Street,Apt 4B,
                        Anytown,CA 91234
                    </p>
                </div>
                <div className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faPhone} className='bg-gray-300 border rounded-3xl p-2 text-2xl' />
                    <p className='mx-2'>
                        +918281132344
                    </p>
                </div>
                <div className='flex justify-center items-center'>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} className='bg-gray-300 border rounded-3xl p-2 text-2xl' />
                    <p className='mx-2'>
                        Bookstore@gmail.com
                    </p>
                </div>

            </div>

            <div className='grid grid-cols-2 mt-8'>
                <div className='flex justify-center items-center flex-col border rounded p-5 mt-4 mx-4 bg-gray-300'>
                    <h1 className='text-2xl'>Send me Message</h1>
                    <input type="text" placeholder='Name' className='mt-4 w-full px-5 py-1 rounded' />
                    <input type="text" placeholder='Email ID' className='mt-4 w-full px-5 py-1 rounded' />
                    <input type="text" placeholder='message' className='mt-4 w-full px-5 rounded' style={{ paddingBottom: '60px' }} />
                    <button className='border rounded w-full bg-black text-white mt-4 p-2'>Send <FontAwesomeIcon icon={faPaperPlane} 
                    className='mx-2'/></button>
                </div>

                <div>
                    2
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contacts
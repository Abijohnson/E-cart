import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {

  const navigate = useNavigate()

  const logout =()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate('/')
  }
  return (
    <>
    <div className='flex justify-between px-20 p-3'>
    <div className='flex items-center'>
          <img src="https://www.pngmart.com/files/22/Book-Logo-PNG-Photo.png" alt="logo"
            style={{ width: '50px', height: '50px' }} />
          <h1 className='text-2xl font-medium ms-3'> BOOK STORE</h1>
        </div>  
        <button onClick={logout} className='px-4 py-3 border border-black rounded hover:bg-black hover:text-white'>
            <FontAwesomeIcon icon={faPowerOff} className='me-3'/>
            Logout
        </button>
    </div>
    <marquee direction="left" className='p-3 bg-gray-900 text-white'>
        <p>Welcome Admin You're all set to manage and monitor the system.Let's get to work!</p>
    </marquee>
    
    </>
  )
}

export default AdminHeader
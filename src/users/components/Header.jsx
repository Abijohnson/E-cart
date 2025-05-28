import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {

  const [status, setStatus] = useState(false)
  const [dropdownStatus,setDropdownStatus] = useState(false)
  const [token,setToken] = useState("")

  // console.log(token);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  },[])
  return (
    <>
      <div className='md:grid grid-cols-3 p-3'>
        <div className='flex items-center'>
          <img src="https://www.pngmart.com/files/22/Book-Logo-PNG-Photo.png" alt="logo"
            style={{ width: '50px', height: '50px' }} />
          <h1 className='text-2xl md:hidden ms-3'> BOOK STORE</h1>
        </div>
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl'> BOOK STORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='me-2' />
          <FontAwesomeIcon icon={faXTwitter} className='me-2' />
          <FontAwesomeIcon icon={faFacebook} className='me-2' />

         {!token ? <Link to={'/login'}>
            <button className='border border-black rounded px-3 py-2 ms-3'>
              <FontAwesomeIcon icon={faUser} className='me-2' /> Login</button>
          </Link>
          :
          <div class="relative inline-block text-left">
            <div>
              <button onClick={()=>setDropdownStatus(!dropdownStatus)} type="button" class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              
              <img src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg" alt="user icon"
            style={{ width: '40px', height: '40px' }} className='mx-2' />
                
              </button>
            </div>

            {dropdownStatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">

             <Link to={'/profile'}>
                  <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">
                  <FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</button>
             </Link>
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">
                <FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

              </div>
            </div>}
          </div>}

        </div>

      </div>

      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center'>
        <div className='flex justify-between items-center px-3 md:hidden'>
          <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>
        
          {!token ?<Link to={'/login'}>
            <button className='border border-white rounded px-3 py-2 ms-3'>
              <FontAwesomeIcon icon={faUser} className='me-2' /> Login</button>
          </Link>
           :
           <div class="relative inline-block text-left">
            <div>
              <button onClick={()=>setDropdownStatus(!dropdownStatus)} type="button" class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              
              <img src="https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg" alt="user icon"
            style={{ width: '40px', height: '40px' }} className='mx-2' />
                
              </button>
            </div>

            {dropdownStatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">

             <Link to={'/profile'}>
                  <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">
                  <FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</button>
             </Link>
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">
                <FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

              </div>
            </div>}

          </div>}

        </div>
        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}> <li className='mx-4 mt-3 md:mt-0'>Home</li></Link>
          <Link to={'/all-Books'}><li className='mx-4 mt-3 md:mt-0'>Books</li></Link>
          <Link to={'/careers'}> <li className='mx-4 mt-3 md:mt-0'>Careers</li></Link>
          <Link to={'/contacts'}><li className='mx-4 mt-3 md:mt-0'>Contact</li></Link>
        </ul>

      </nav>
    </>
  )
}

export default Header
import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function EditProfile() {
  const [offCanavasStatus, setOffCanavasStatus] = useState(false)
  return (
    <>
      <div className='flex justify-end mt-5 md:mt-0'>
        <button onClick={() => setOffCanavasStatus(true)} className='text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white'>
          <FontAwesomeIcon icon={faPenToSquare} />Edit</button>
      </div>
      {offCanavasStatus && <div>
        <div className='fixed inset-0 bg-gray-500/75 transition-opacity w-full h-full'
          onClick={() => setOffCanavasStatus(false)}></div>

        <div className='bg-white h-full z-50 fixed top-0 left-0' style={{ width: '300px' }}>
          <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
            <h1>Edit User Profile</h1>
            <FontAwesomeIcon className='cursor-pointer' onClick={() => setOffCanavasStatus(false)} icon={faXmark} />
          </div>
          <div className='flex justify-center items-center flex-col my-5'>
            <label htmlFor="profilefile">
              <input id='profilefile' type="file" style={{ display: 'none' }} />
              <img className='z-52' src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                alt="no image" style={{ width: '200px', height: '200px' }} />
              <div className='bg-yellow-300 z-52 fixed text-white px-4 py-3 rounded' style={{ marginLeft: '135px', marginTop: '-50px' }}>
                <FontAwesomeIcon icon={faPen} /></div>
            </label>

            <div className="mb-3 mt-5 w-full px-5">
              <input type="text" placeholder='Username' className='w-full border border-gray-300
              placeholder-gray-200 p-2 rounded' />
            </div>
            <div className="mb-3 w-full px-5 ">
              <input type="text" placeholder='Password' className='w-full border border-gray-300
              placeholder-gray-200 p-2 rounded' />
            </div>
            <div className="mb-3 w-full px-5">
              <input type="text" placeholder='Confirm Password' className='w-full border border-gray-300
              placeholder-gray-200 p-2 rounded' />
            </div>
            <div className="mb-3 w-full px-5">
              <textarea placeholder='Bio' rows={5} className='w-full border border-gray-300
              placeholder-gray-200 p-2 rounded' ></textarea>
            </div>

            <div className='flex justify-end w-full px-5 '>
              <button className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600
              hover:border hover:border-amber-600 hover:bg-white'>Reset</button>

              <button className='bg-green-600 text-black rounded py-3 px-4 hover:text-green-600
              hover:border hover:border-green-600 hover:bg-white ms-4'>Update</button>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default EditProfile
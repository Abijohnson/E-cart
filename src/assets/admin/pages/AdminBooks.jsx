import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../../services/allApi'
import { ToastContainer } from 'react-toastify'

function AdminBooks() {
    const [bookListStatus, setBookListStatus] = useState(true)
    const [userStatus, setUserStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState([])
    const [token, setToken] = useState("")
    const [approveStatus, setApproveStatus] = useState(false)
    const [allusers, setallusers] = useState([])

    const getAllBookAdmin = async (token) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllBookAdminApi(reqHeader)
        // console.log(result);
        if (result.status == 200) {
            setBookDetails(result.data)

        }

    }

    const approveBook = async (data) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await approveBookApi(data, reqHeader)
        console.log(result);
        if (result.status == 200) {
            setApproveStatus(!approveStatus)
        } else {
            toast.error('Something went wrong')
        }

    }

    const getAllUsers = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUsersApi(reqHeader)
        // console.log(result);
        if (result.status == 200) {
            setallusers(result.data)
        }


    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
            if (bookListStatus == true) {
                getAllBookAdmin(token)
            } else if (userStatus == true) {
                getAllUsers(token)
            } else {
                console.log('Something went wrong');

            }
        }

    }, [approveStatus, userStatus])
    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='flex justify-center items-center flex-col mt-5 text-3xl'>All Books</h1>
                    <div className='flex justify-center items-center my-5'>
                        <p onClick={() => { setBookListStatus(true); setUserStatus(false) }} className={bookListStatus ? 'p-4 text-blue-500 border-b border-gray-400 '
                            : 'p-4 text-black border-t border-l  border-gray-400 '}>Book List</p>
                        <p onClick={() => { setBookListStatus(false); setUserStatus(true) }} className={userStatus ? 'p-4 text-blue-500 border-b border-gray-400 '
                            : 'p-4 text-black border-t border-r  border-gray-400 '}>User</p>
                    </div>
                    {bookListStatus && <div className="grid grid-cols-4">
                        {
                            bookDetails?.length > 0 ?
                                bookDetails?.map((item, index) => (
                                    <div className='p-3' key={index}>
                                        <div className={item?.status == 'sold' ? 'p-3 shadow-md opacity-50' : 'p-3 shadow-md'}>
                                            <img src={item?.imageurl}
                                                alt="no image" style={{ width: '100%', height: '300px' }} />
                                            <div className='flex justify-center flex-col items-center mt-3'>
                                                <p className='text-blue-700'>{item?.author.slice(0, 20)}</p>
                                                <h3>{item?.title.slice(0, 20)}....</h3>
                                                <p className='text-orange-400'>${item?.dprice}</p>

                                                {item?.status == 'pending' && <button className='w-full mt-3 px-3 py-2 bg-green-700 text-white hover:border hover:border-green-700
                                     hover:text-green-700 hover:bg-white' onClick={() => approveBook(item)}>Approve</button>}

                                                {item?.status == 'approved' &&
                                                    <div className='flex justify-end w-full'>
                                                        <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png"
                                                            alt="approved" style={{ width: '40px', height: '40px' }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <p>No books</p>
                        }

                    </div>}

                    {userStatus && <div className='md:grid grid-cols-3 p-10'>
                        {allusers?.length > 0 ?
                            allusers?.map((user) => (
                                <div className='bg-gray-100 p-4 rounded md:m-4 mt-4'>
                                    <p className='text-red-700'>ID:{user?._id}</p>
                                    <div className="grid grid-cols-[1fr_2fr] mt-3">
                                        <div className='flex justify-center items-center'>
                                            <img src={user?.profile == "" ?"https://cdn-icons-png.freepik.com/512/8742/8742495.png" :
                                                `${user?.profile}` } alt="no image"
                                                style={{ width: '70px', height: '70px', borderRadius: ' 50 % ' }} />
                                        </div>
                                        < div >
                                            <p className='text-blue-700'>{user?.username}</p>
                                            <p style={{fontSize:'12px'}} className='text-danger-600'>{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <p>No users</p>
                        }
                    </div>}
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
            <Footer />
        </>
    )
}

export default AdminBooks
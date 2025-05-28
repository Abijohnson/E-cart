import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateProfileApi } from '../../../services/allApi'
import { serverUrl } from '../../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../../context/Contextshare'

function AdminSettings() {

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })
  console.log(adminDetails);

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingProfileImage, setExistingProfileImage] = useState("")
  const [updateStatus,setUpdateStatus] = useState({})
  const {setAdminProfileUpdateStatus} = useContext(adminProfileUpdateStatusContext)

  const handleFileAdd = (e) => {
    // console.log(e.target.files[0]);
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }
  console.log(preview);

  const handleReset = () => {
     if (sessionStorage.getItem("token")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingProfileImage(user.profile)
    }
    setPreview("")
  }

  const handleAdd = async () => {
    const { username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);
    if (!username || !password || !cPassword) {
      toast.info('Please add complete details')
    } else {

      if (password != cPassword) {
        toast.warning('password must match')
      } else {
        if (preview) {
          const reqBody = new FormData()

          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await updateProfileApi(reqBody, reqHeader)
          console.log(result);
          if(result.status == 200){
            toast.success('Profile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)
          }else{
            toast.error('Something went wrong')
            setUpdateStatus(result)
          }
        } else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
          console.log(result);
          if(result.status == 200){
            toast.success('Profile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)

          }else{
            toast.error('Something went wrong')
            setUpdateStatus(result)
          }
        }
      }


    }

  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingProfileImage(user.profile)
    }
  }, [updateStatus])
  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>

        <div>
          <h1 className='flex justify-center items-center flex-col mt-5 text-3xl'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-5'>
            <div className='px-16 py-10'>
              <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolor eos maiores. Porro
                autem totam fugiat exercitationem ratione. Dicta quia inventore ipsa vel sapiente ipsum!
                Velit iusto cum commodi maxime Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Id quibusdam dolore quaerat, accusantium explicabo illum reprehenderit natus cupiditate?.</p>

              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia ipsum asperiores aut, perferendis
                earum quas mollitia nihil recusandae sapiente? Ullam distinctio sapiente quam deserunt nulla nisi vel
                tempore reiciendis beatae Lorem ipsum dolor sit amet consectetur adipisicing elit. At repellat alias
                suscipit obcaecati quidem voluptatum, et sequi, ullam nulla aut nobis non. Nostrum a et quidem nemo
                nesciunt culpa voluptate Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti vero accusantium
                laborum atque voluptatum. Voluptas error ea fugit architecto incidunt dolorem. Libero ipsa dolores, eveniet
                corrupti maxime nemo earum. Voluptatem!..</p>
            </div>
            <div className='flex justify-center items-center flex-col my-5 border bg-gray-300 p-5 rounded'>
              <label htmlFor="profilefile">
                <input id='profilefile' type="file" style={{ display: 'none' }} onChange={(e) => handleFileAdd(e)} />

                {existingProfileImage == "" ? <img className='z-52' src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"}
                  alt="no image" style={{ width: '200px', height: '200px' }} /> :

                  <img className='z-52' src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`}
                    alt="no image" style={{ width: '200px', height: '200px' }} />}

                <div className='bg-yellow-300 z-52 fixed text-white px-4 py-3 rounded' style={{ marginLeft: '135px', marginTop: '-50px' }}>
                  <FontAwesomeIcon icon={faPen} /></div>
              </label>

              <div className="mb-3 mt-5 w-full px-5">
                <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300
                      placeholder-gray-200 p-2 rounded' />
              </div>
              <div className="mb-3 w-full px-5 ">
                <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300
                      placeholder-gray-200 p-2 rounded' />
              </div>
              <div className="mb-3 w-full px-5">
                <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300
                      placeholder-gray-200 p-2 rounded' />
              </div>


              <div className='flex justify-end w-full px-5 '>
                <button type='button' onClick={handleReset} className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600
                      hover:border hover:border-amber-600 hover:bg-white'>Reset</button>

                <button type='button' onClick={handleAdd} className='bg-green-600 text-black rounded py-3 px-4 hover:text-green-600
                      hover:border hover:border-green-600 hover:bg-white ms-4'>Update</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminSettings
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginApi, loginApi, registerApi } from '../services/allApi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Auth({ register }) {

  const navigate = useNavigate()

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const handleRegister = async () => {

    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info('Please fill the complete details')
    } else {
      const result = await registerApi({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('register successfull')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.warning('Something went wrong')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }

  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Please Enter the complete details')
    } else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('login successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setTimeout(() => {
          if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
            navigate('/admin-home')
          } else {
            navigate('/')
          }
        }, 2500)
      } else if (result.status == 401) {
        toast.warning(result.response.data)
        setuserDetails({
          email: "",
          password: ""
        })
      } else if (result.status == 404) {
        toast.warning(result.response.data)
        setuserDetails({
          email: "",
          password: ""
        })
      } else {
        toast.warning('Something went wrong')
        setuserDetails({
          email: "",
          password: ""
        })
      }

    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleLoginApi({username:details.name,email:details.email,password:'googlepswd',photo:details.picture})
    console.log(result);
    if(result.status == 200){
      toast.success('login successfull')
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
        setTimeout(() => {
          if (result.data.existingUser.email == 'bookstoreadmin@gmail.com') {
            navigate('/admin-home')
          } else {
            navigate('/')
          }
        }, 2500)
    }else{
      toast.error('something went wrong')
    }
  }

  return (
    <div id='loginPage' className='flex justify-center items-center'>
      <div className='md:grid grid-cols-3 w-full'>
        <div></div>
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-3xl mb-5 font-bold text-white md:text-black'>Book Store</h1>
          <form className='w-full bg-gray-900 p-5 flex justify-center items-center flex-col'>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }}
              className='border border-white flex justify-center items-center'>
              <FontAwesomeIcon icon={faUser} className='text-white fa-2x' />
            </div>
            {!register ? <h1 className='text-white mt-5 text-3xl mb-8'>Login</h1> :
              <h1 className='text-white mt-5 text-3xl mb-8'>Register</h1>}
            {register && <div className='mb-3 w-full mt-8'>
              <input type="text" placeholder='username' className='p-2 rounded placeholder-gray-600
               bg-white w-full' onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} />
            </div>}
            <div className='mb-3 w-full'>
              <input type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600
               bg-white w-full' onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} />
            </div>
            <div className='mb-2 w-full'>
              <input type="text" placeholder='Password' className='p-2 rounded placeholder-gray-600
               bg-white w-full' onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} />
            </div>
            <div className='mb-5 w-full flex justify-between'>
              <p className='text-amber-300' style={{ fontSize: '10px' }}>*Never share your Password
                with others</p>
              {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forget Password</p>}
            </div>
            {register ? <div className='mb-2 w-full'>
              <button type='button' className='bg-green-800 text-white w-full p-3 rounded' onClick={handleRegister}>Register</button>
            </div> :
              <div className='mb-2 w-full'>
                <button type='button' onClick={handleLogin} className='bg-green-800 text-white w-full p-3 rounded'>Login</button>
              </div>}
            {!register && <p className='text-white'>.........................or.........................</p>}
            {!register && <div className='mb-5 mt-3 w-full'>
              {/* <button className='bg-white text-black w-full p-3 rounded'>Sign in with Google</button> */}
              <GoogleLogin width={'350px'}
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  toast.error('Login Failed');
                }}
              />;
            </div>}
            {register ? <p className='text-white'>Are you Already a User ?<Link to={'/login'} className='text-blue-400
               underline ms-2'>Login</Link></p> :
              <p className='text-white'>Are you a New User ?<Link to={'/register'} className='text-blue-400
               underline ms-2'>Register</Link></p>}

          </form>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </div>
  )
}

export default Auth
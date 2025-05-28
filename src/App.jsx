import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import AllBooks from './users/pages/AllBooks'
import Careers from './users/pages/Careers'
import Contacts from './users/pages/Contacts'
import Profile from './users/pages/Profile'
import AdminHome from './assets/admin/pages/AdminHome'
import AdminBooks from './assets/admin/pages/AdminBooks'
import AdminCareers from './assets/admin/pages/AdminCareers'
import AdminSettings from './assets/admin/pages/AdminSettings'
import Viewbook from './users/pages/Viewbook'
import Paymentsuccess from './users/pages/Paymentsuccess'
import Paymenterror from './users/pages/Paymenterror'

function App() {

  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true)
    }, 6000)
  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={isloading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/all-Books' element={<AllBooks />} />
        <Route path='/view-books/:id' element={<Viewbook />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin-home' element={isloading ? <AdminHome /> : <Preloader />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/payment-success' element={<Paymentsuccess />} />
        <Route path='/payment-error' element={<Paymenterror />} />
        <Route path='*' element={<PagenotFound />} />
      </Routes>

    </>
  )
}

export default App

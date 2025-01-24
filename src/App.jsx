
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pnf from './pages/pnf'
import View from './pages/View'
import Whislist from './pages/Wishlist'
import Cart from './pages/Cart'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/wishlist' element={<Whislist/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/:id/view' element={<View/>}/>
      <Route path='/*' element={<Pnf/>}/>
     </Routes>
        

        {/* footer */}
        <Footer/>
    </>
  )
}

export default App

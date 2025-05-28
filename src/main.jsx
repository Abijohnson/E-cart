import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './context/Contextshare.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <BrowserRouter>
   <GoogleOAuthProvider clientId='796683280328-k6qv1jinand37iajrnk4b64e94v0ojit.apps.googleusercontent.com'>
    <Contextshare>
       <App />
    </Contextshare>
   
   </GoogleOAuthProvider>
    </BrowserRouter>
  
  </StrictMode>,
)

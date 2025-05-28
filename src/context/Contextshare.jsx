import React, { createContext, useState } from 'react'


export const searchKeyContext = createContext("")
export const adminProfileUpdateStatusContext = createContext("")


function Contextshare({children}) {

  const [searchKey,setsearchKey] = useState("")
  const [adminProfileUpdateStatus,setAdminProfileUpdateStatus] = useState([])
    
  return (
   
     
    <adminProfileUpdateStatusContext.Provider value={{adminProfileUpdateStatus,setAdminProfileUpdateStatus}}>
        <searchKeyContext.Provider value={{searchKey,setsearchKey}}>
           {
            children
           }
        </searchKeyContext.Provider>
    </adminProfileUpdateStatusContext.Provider>
    
    
  )
}

export default Contextshare
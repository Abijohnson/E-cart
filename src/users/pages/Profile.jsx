import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { deleteAUserBookApi, getAllUserBookApi, getAllUserBroughtBookApi, uploadBookApi } from '../../services/allApi'

function Profile() {
    const [sellstatus, setSellstatus] = useState(true)
    const [bookstatus, setBookStatus] = useState(false)
    const [purchaseStatus, setPurchaseStatus] = useState(false)
    const [bookDetails,setBookDetails] = useState({
        title:"",author:"",imageurl:"",noofpages:"",price:"",dprice:"",abstract:"",publisher:"",
        language:"",isbn:"",category:"",
        uploadedImages:[]
    })

    const [preview,setpreview] = useState("")
    const [previewList,setpreviewList] = useState([])
    const [token,setToken] = useState("")
    const [userBook, setuserBook] = useState([])
    const [userBroughtBook, setuserBroughtBook] = useState([])
    const [deleteStatus,setDeleteStatus] = useState("")

    // console.log(bookDetails);

    const handleUpload = (e)=>{
        console.log(e.target.files[0]);

        const fileArray = bookDetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({...bookDetails,uploadedImages:fileArray})

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setpreview(url)

        const newArray = previewList
        newArray.push(url)
        setpreviewList(newArray)
        
    }

    const handleReset =()=>{
        setBookDetails({
             title:"",author:"",imageurl:"",noofpages:"",price:"",dprice:"",abstract:"",publisher:"",
        language:"",isbn:"",category:"",
        uploadedImages:[]
        })
        setpreview("")
        setpreviewList([])
    }

    const handleSubmit = async()=>{
        const { title,author,imageurl,noofpages,price,dprice,abstract,publisher,
        language,isbn,category,uploadedImages} = bookDetails
        if(!title || !author || !imageurl || !noofpages || !price || !dprice || !abstract || !publisher ||
            !language  || !isbn || !category || uploadedImages.length==0){
                toast.info('Please fill the fields completely')
            }else{
                const reqHeader ={
                    "Authorization": `Bearer ${token}`
                }

                const reqBody = new FormData()

                for(let key in bookDetails){
                   if(key !='uploadedImages'){
                     reqBody.append(key , bookDetails[key])
                   }else{
                    bookDetails.uploadedImages.forEach((item)=>{
                        reqBody.append("uploadedImages",item)
                    })
                   }
                }

                const result =await uploadBookApi(reqBody,reqHeader)
                console.log(result);

                if(result.status == 401){
                    toast.warning(result.response.data)
                    handleReset()
                }else if(result.status == 200){
                    toast.success('Book Added Successfully')
                    handleReset()
                }else{
                    toast.error('Something went wrong')
                    handleReset()
                }
                
            }
    }


    const getAllUserBook = async()=>{
         const reqHeader ={
                    "Authorization": `Bearer ${token}`
                }
        const result = await getAllUserBookApi(reqHeader)
        console.log(result);
        if(result.status == 200){
            setuserBook(result.data)
        }
        
    }
     const getAllUserBroughtBook = async()=>{
         const reqHeader ={
                    "Authorization": `Bearer ${token}`
                }
        const result = await getAllUserBroughtBookApi(reqHeader)
        console.log(result);
         if(result.status == 200){
            setuserBroughtBook(result.data)
        }
    }

    const deleteBook = async(id)=>{
        const result = await deleteAUserBookApi(id)
        console.log(result);
        if(result.status == 200){
            setDeleteStatus(result.data)
        }
        
    }


    useEffect(()=>{
       if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
        
       }
    },[])
    useEffect(()=>{
      if(bookstatus == true){
        getAllUserBook()
      }else if(purchaseStatus == true){
        getAllUserBroughtBook()
      }else{
        console.log('Something went wrong');
      }
    },[bookstatus,deleteStatus])
    
    return (
        <>
            <Header />
            <div style={{ height: '200px' }} className='bg-gray-900'></div>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }}
                className='bg-white p-3'>
                <img src="https://png.pngitem.com/pimgs/s/359-3590507_svg-free-download-onlinewebfonts-contacts-icon-in-circle.png"
                    alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            </div>
            <div className="md:flex justify-between px-20 mt-5">
                <p className='flex justify-center items-center'>
                    <span className='md:text-3xl text-2xl'>Abi V J</span>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3 mt-2' />
                </p>
                <EditProfile />
            </div>
            <p className='md:px-20 px-5 my-5 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor sapiente cupiditate asperiores tempore
                illum commodi sint deleniti rerum blanditiis accusantium corrupti placeat molestiae, laborum accusamus
                obcaecati dicta. Quibusdam, consequatur facere Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nulla nemo labore quod ratione autem tempore vero, quam porro dolorem eaque, libero fugiat laboriosam?
                Odio inventore, non blanditiis veritatis quo commodi..</p>

            <div className='md:px-40'>
                {/* tab */}
                <div className='flex justify-center items-center my-5'>
                    <p onClick={() => { setSellstatus(true); setBookStatus(false); setPurchaseStatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-400 rounded '
                        : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>

                    <p onClick={() => { setSellstatus(false); setBookStatus(true); setPurchaseStatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-400 rounded'
                        : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Book Status</p>

                    <p onClick={() => { setSellstatus(false); setBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-400 rounded'
                        : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
                </div>

                {/* content */}
                {sellstatus && <div className='bg-gray-200 p-5 my-20'>
                    <h1 className='text-center text-3xl font-medium'>Book Details</h1>
                    <div className="grid grid-cols-2 mt-5">
                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.title} placeholder='Title' className='p-2 bg-white rounded 
                                 placeholder-gray-300 w-full' 
                                 onChange={(e)=>setBookDetails({...bookDetails,title:e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Author' value={bookDetails.author}  className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                            onChange={(e)=>setBookDetails({...bookDetails,author:e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.noofpages}  placeholder='No of Pages' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                            onChange={(e)=>setBookDetails({...bookDetails,noofpages:e.target.value})}/> 
                            </div>
                            <div className="mb-3">
                                <input type="text"  value={bookDetails.imageurl}  placeholder='Image url' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                            onChange={(e)=>setBookDetails({...bookDetails,imageurl:e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.price}  placeholder='Price' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                            onChange={(e)=>setBookDetails({...bookDetails,price:e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.dprice}  placeholder='Discount price' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                             onChange={(e)=>setBookDetails({...bookDetails,dprice:e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <textarea rows={5}  value={bookDetails.abstract}  placeholder='Abstract' className='p-2 bg-white rounded 
                         placeholder-gray-300 w-full'
                          onChange={(e)=>setBookDetails({...bookDetails,abstract:e.target.value})}></textarea>
                            </div>
                        </div>
                        <div className='px-3'>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.publisher}  placeholder='Publisher' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                             onChange={(e)=>setBookDetails({...bookDetails,publisher:e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.language}  placeholder='Language' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full' 
                             onChange={(e)=>setBookDetails({...bookDetails,language:e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.isbn}  placeholder='ISBN' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                             onChange={(e)=>setBookDetails({...bookDetails,isbn:e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={bookDetails.category}  placeholder='Category' className='p-2 bg-white rounded 
                            placeholder-gray-300 w-full'
                             onChange={(e)=>setBookDetails({...bookDetails,category:e.target.value})} />
                            </div>

                            <div className="mb-3 flex justify-center items-center w-full">
                               { !preview ? <label htmlFor="imagefile">
                                    <input id='imagefile' type="file" style={{ display: 'none' }} onChange={handleUpload} />
                                    <img src="https://cdn-icons-png.freepik.com/256/10024/10024501.png?semt=ais_hybrid"
                                        alt="no image" style={{ width: '200px', height: '200px' }} />
                                </label>  :
                                 <img src={preview}
                                        alt="no image" style={{ width: '200px', height: '200px' }} />}
                            </div>
                           {preview && <div className='flex justify-center items-center'>
                               {previewList?.map((item)=>(
                                     <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} />
                               ))}
                                   {previewList.length<3 && <label htmlFor="imagefile">
                                    <input id='imagefile' type="file" style={{ display: 'none' }} onChange={handleUpload} />
                                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500' />
                                </label>}
                            </div>}
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={handleReset} className='bg-amber-600 rounded text-black p-3 hover:bg-white 
                        hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>
                        <button onClick={handleSubmit} className='bg-green-600 rounded text-black p-3 hover:bg-white 
                        hover:border hover:border-green-600 hover:text-green-600 ms-4'>Submit</button>
                    </div>
                </div>}

                {bookstatus && <div className='p-10 my-20 shadow rounded'>
                    {userBook?.length>0?
                    userBook?.map((item)=>(
                         <div className='bg-gray-200 p-5 rounded mb-5'>
                        <div className="md:grid grid-cols-[3fr_1fr]">
                            <div className='px-4'>
                                <h1 className='text-2xl'>{item?.title}</h1>
                                <h2>{item?.author}</h2>
                                <h3 className='text-blue-600'>$ {item?.dprice}</h3>
                                <p>{item?.abstract}</p>
                                <div className='flex'>
                                    {item?.status == 'pending' ?<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9zosgOBzsuAnthIota9WPcZoqOyqjSMJqYw&s"
                                        alt="no image" style={{ width: '70px', height: '70px' }} />
                                    : item?.status == 'approved' ?
                                    <img src="https://media.istockphoto.com/id/1219181841/vector/approved-stamp.jpg?s=612x612&w=0&k=20&c=Ob1oClnS4284pvOSe6pslEQ4NF0MlOUIyslD9WfshtU="
                                        alt="no image" style={{ width: '70px', height: '70px' }} />
                                    : 
                                    <img src="https://www.onlygfx.com/wp-content/uploads/2017/12/sold-stamp-3-1024x795.png"
                                        alt="no image" style={{ width: '70px', height: '70px' }} />}
                                </div>
                            </div>
                            <div className='px-4'>
                                <img src={item?.imageurl}
                                    alt="no image" className='w-full' style={{ height: '250px' }} />
                                <div className='flex justify-end mt-4'>
                                    <button onClick={()=>deleteBook(item?._id)} className='p-2 bg-red-600 text-white hover:bg-gray-200 hover:text-red-600
                                    hover:border hover:border-red-600 rounded'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                       :
                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                         alt="no image" style={{width:'200px',height:'200px'}} />
                        <p className='text-red-600 text-2xl'>No Book Added Yet</p>
                    </div>}
                </div>}

                {purchaseStatus && <div className='p-10 my-20 shadow rounded'>
                   {userBroughtBook?.length>0?
                   userBroughtBook?.map((item)=>(
                     <div className='bg-gray-200 p-5 rounded'>
                        <div className="md:grid grid-cols-[3fr_1fr]">
                            <div className='px-4'>
                                <h1 className='text-2xl'>Beyond The Ocean door</h1>
                                <h2>Bram Stoker</h2>
                                <h3 className='text-blue-600'>$ 13</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda recusandae
                                    voluptatem nemo expedita suscipit quae laudantium, accusamus dolore? Totam expedita
                                    eos fugit amet reiciendis ipsam quibusdam consequuntur? Soluta, odit voluptate Lorem
                                    ipsum dolor, sit amet consectetur adipisicing elit. Ex dolorem, facilis, blanditiis officia
                                    distinctio quas fuga laudantium consequatur ab expedita tenetur odio ipsam veritatis hic natus
                                    at minus, architecto voluptate?.</p>
                                <div className='flex'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9zosgOBzsuAnthIota9WPcZoqOyqjSMJqYw&s"
                                        alt="no image" style={{ width: '70px', height: '70px' }} />

                                    <img src="https://media.istockphoto.com/id/1219181841/vector/approved-stamp.jpg?s=612x612&w=0&k=20&c=Ob1oClnS4284pvOSe6pslEQ4NF0MlOUIyslD9WfshtU="
                                        alt="no image" style={{ width: '70px', height: '70px' }} />

                                    <img src="https://www.onlygfx.com/wp-content/uploads/2017/12/sold-stamp-3-1024x795.png"
                                        alt="no image" style={{ width: '70px', height: '70px' }} />
                                </div>
                            </div>
                            <div className='px-4'>
                                <img src="https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg"
                                    alt="no image" className='w-full' style={{ height: '250px' }} />
                               
                            </div>
                        </div>
                    </div>
                   ))
                       :
                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                         alt="no image" style={{width:'200px',height:'200px'}} />
                        <p className='text-red-600 text-2xl'>No Book Purchased Yet</p>
                    </div>}
                    </div>}


            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
            <Footer />
        </>
    )
}

export default Profile
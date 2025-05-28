import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'
import { toast, ToastContainer } from 'react-toastify'

function Home() {

  const [homeBook,setHomeBook] = useState([])
  const {searchKey,setsearchKey} = useContext(searchKeyContext)
  const navigate = useNavigate()

  const getAllHomeBook = async()=>{
    const result = await homeBookApi()
    // console.log(result);
    if(result.status == 200){
      setHomeBook(result.data)
    }
    
  }
  // console.log(homeBook);

  const handleSearch = ()=>{
    const token = sessionStorage.getItem("token")
    if(searchKey == ""){
      toast.info('Please enter the title of the book')
    }else if(!token){
      toast.info('Please login')
      setTimeout(()=>{
        navigate('/login')
      },2500)

    }else if(searchKey && token){
      navigate('/all-books')
    }else{
      toast.error('Something went wrong')
    }

  }
  
  useEffect(()=>{
    setsearchKey("")
    getAllHomeBook()
  },[])
  return (
    <>
      <Header />
      <header className='flex justify-center items-center'>
        <div id='main' className='flex justify-center items-center'>
          <div className='md:grid grid-cols-3 w-full'>
            <div></div>
            <div className='text-white flex justify-center items-center flex-col px-5'>
              <h1 className='text-5xl'>Wonderful Gifts</h1>
              <p>Give your family and friends a book</p>
              <div className='flex mt-10 w-full'>
                <input type="text" onChange={(e)=>setsearchKey(e.target.value)} placeholder='Search Books' className='py-2 px-4 bg-white rounded-3xl
                placeholder-gray-400 w-full text-black '/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-800 ' style={{
                  marginTop: '11px',
                  marginLeft: '-30px'
                }} onClick={handleSearch} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* new arrival */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>


        <h2>NEW ARRIVALS</h2>
        <h4 className='text-2xl'>Explore Our Latest Collection</h4>

        <div className='md:grid grid-cols-4 w-full mt-5'>
         {
          homeBook?.length>0?
          homeBook.map((item)=>(
             <div className='p-3'>
            <div className='p-3 shadow-md'>
              <img src={item?.imageurl}
                alt="no image" style={{ width: '100%', height: '300px' }} />
              <div className='flex justify-center flex-col items-center mt-3'>
                <p>{item?.author}</p>
                <h3>{item?.title}</h3>
                <p>${item?.dprice}</p>
              </div>
            </div>
          </div>
          )):
          <p>Loading....</p>
         }
          
        </div>

        <div className="flex justify-center items-center my-5">
         <Link to={'/all-Books'}>
            <button className='px-3 py-2 bg-blue-950 text-white hover:border hover:border-blue-950
              hover:text-blue-950 hover:bg-white'>Explore More</button>
         </Link>
        </div>
      </section>

      {/* author */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2 w-full'>
          <div>
            <div className='flex justify-center items-center flex-col'>
              <h4>FEATURED AUTHORS</h4>
              <h3 className='text-2xl'>Captivates with every word</h3>
            </div>
            <p className='mt-5 text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, quisquam? Libero tenetur,
              assumenda reprehenderit eligendi distinctio sequi facilis laborum, nesciunt dolor earum culpa blanditiis beatae officia ex cupiditate, soluta minima!</p>
            <p className='mt-4 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit aperiam quia doloribus pariatur autem eveniet dolorem voluptatibus eius repellat,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates non minima officiis molestias reprehenderit dicta quos delectus dolores modi
              perspiciatis deleniti repellat molestiae accusamus, temporibus veritatis quo aut! Exercitationem, veniam?
              ea provident dicta beatae non unde consectetur omnis dolores! Modi, aut.</p>
          </div>
          <div className='px-10 pt-8'>
            <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
              alt="no image" className='w-full' />
          </div>
        </div>
      </section>

      {/* testmonial */}
      <div className='flex justify-center items-center flex-col md:py-10  md:px-40 p-6'>
        <h3>TESTIMONIALS</h3>
        <h3 className='text-2xl'>See What Others Are Saying</h3>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQal-zoU3mjqRLlaGfm4m4b3OWZAyv6BYvJXQ&s" alt="no image" 
        style={{width:'150px',height:'150px',borderRadius:'50%'}} className='mt-5'/>
        <h6 className='mt-3'>Treesa Joseph</h6>

        <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dignissimos velit quaerat error tempore possimus modi rem
           reiciendis quia veniam porro, facilis fugit nostrum, magnam alias maxime laboriosam in dolorem?Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Id aliquid expedita veniam consequatur blanditiis architecto temporibus exercitationem labore 
            aliquam praesentium et at totam laborum nobis, ut dolor molestias iure. Et.</p>

      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
      <Footer />
    </>
  )
}

export default Home
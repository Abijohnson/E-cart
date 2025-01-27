import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'



const Home = () => {
    const dispatch = useDispatch()

    const { allproducts, loading, errorMsg } = useSelector(state => state.productReducer)
    // console.log(allproducts, loading, errorMsg);
    const [currentpage,setCurrentPage] = useState(1)
    const productPerPage = 8
    const totalPages = Math.ceil(allproducts?.length/productPerPage)
    const currentPageProductLastIndex = currentpage + productPerPage
    const currentPageProductFirstIndex = currentPageProductLastIndex-productPerPage
    const visibleAllProducts = allproducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)


    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const navigateToNextPage = ()=>{
        if(currentpage!=totalPages){
            setCurrentPage(currentpage+1)
        }
    }
    const navigateToPrevPage = ()=>{
        if(currentpage!=1){
            setCurrentPage(currentpage-1)
        }
    }


    return (
        <>
            <Header insideHome={true} />
            <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto'>
                {
                    loading ?
                        <div className='flex justify-center items-center my-5 text-lg'>
                            <img width={'80px'} height={'80px'} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
                            Loading....
                        </div>
                        :
                        <>
                            <div className='grid grid-cols-4 gap-4'>
                                {
                                    allproducts?.length > 0 ?
                                        visibleAllProducts?.map(product => (
                                            <div key={product?.id} className='rounded border p-2 shadow'>
                                                <img width={'100%'} height={'100%'} src={product?.thumbnail} alt="" />
                                                <div className='text-center'>
                                                    <h3 className='text-x1 font-bold'>{product?.title}</h3>
                                                    <Link to={`/${product?.id}/view`} className='bg-violet-600 rounded p-1 mt-3 text-white
                                                     inline-block'>View More...</Link>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className='flex justify-center items-center font-bold text-red-600 my-5 text-lg'>
                                            Product Not Found!!!
                                        </div>
                                }
                            </div>
                            <div className='text-2xl text-center font-bold mt-20'>
                                <span onClick={navigateToPrevPage} className='cursor-pointer'><i className='fa-solid fa-backward me-5'></i></span>
                                <span>{currentpage} of {totalPages}</span>
                                <span onClick={navigateToNextPage} className='cursor-pointer'><i className='fa-solid fa-forward ms-5'></i></span>
                            </div>

                        </>
                }
            </div>
        </>
    )
}

export default Home
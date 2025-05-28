import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { addJobApi, deleteJobApi, getAllApplicationApi, getAllJobsApi } from '../../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../../services/serverUrl'

function AdminCareers() {
  const [jobPostStatus, setJobPostStatus] = useState(true)
  const [viewStatus, setViewStatus] = useState(false)
  const [modalstatus, setModalstatus] = useState(false)
  const [allJobs, setAllJobs] = useState([])
  const [addJobStatus, setAddJobStatus] = useState({})
  const [searchKey, setsearchKey] = useState("")
  const [deleteJobStatus, setDeleteJobStatus] = useState({})
  const [allApplication, setAllApplication] = useState([])
  const [jobDetails, setJobDetails] = useState({
    title: "", location: "", jtype: "", salary: "", qualification: "", experience: "", description: ""
  })
  console.log(jobDetails);

  const handleReset = () => {
    setJobDetails({
      title: "", location: "", jtype: "", salary: "", qualification: "", experience: "", description: ""
    })
  }

  const handleSubmit = async () => {
    const { title, location, jtype, salary, qualification, experience, description } = jobDetails
    if (!title || !location || !jtype || !salary || !qualification || !experience || !description) {
      toast.info('Please fill the field completely')
    } else {
      const result = await addJobApi({ title, location, jtype, salary, qualification, experience, description })
      console.log(result);
      if (result.status == 200) {
        toast.success('Job added successfully')
        handleReset()
        setModalstatus(false)
        setAddJobStatus(result.data)
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        handleReset()
      } else {
        toast.error('Something went wrong')
        handleReset()
      }
    }
  }

  const getAllJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    console.log(result);
    if (result.status == 200) {
      setAllJobs(result.data)
    }
  }
  // console.log(allJobs);

  const deleteJob = async (id) => {
    const result = await deleteJobApi(id)
    console.log(result);
    if (result.status == 200) {
      setDeleteJobStatus(result.data)
    }

  }

  //get all job applications
  const getAllApplication = async () => {
    const result = await getAllApplicationApi()
    if (result.status == 200) {
      setAllApplication(result.data)
    }
  }
  console.log(allApplication);



  useEffect(() => {
    if (jobPostStatus == true) {
      getAllJobs(searchKey)
    } else if (viewStatus == true) {
      getAllApplication()
    } else {
      console.log('Something went wrong');

    }
  }, [addJobStatus, searchKey, deleteJobStatus, viewStatus])

  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='flex justify-center items-center flex-col mt-5 text-3xl'>Careers</h1>
          <div className='flex justify-center items-center my-5'>
            <p onClick={() => { setJobPostStatus(true); setViewStatus(false) }} className={jobPostStatus ? 'p-4 text-blue-500 border-b border-gray-400 '
              : 'p-4 text-black border-t border-l  border-gray-400 '}>Job Post</p>
            <p onClick={() => { setJobPostStatus(false); setViewStatus(true) }} className={viewStatus ? 'p-4 text-blue-500 border-b border-gray-400 '
              : 'p-4 text-black border-t border-r  border-gray-400 '}>View Applicant</p>
          </div>
          {jobPostStatus && <div>
            <div className='md:flex justify-between'>
              <div className='md:px-20 flex justify-center'>
                <input type="text" value={searchKey} onChange={(e) => setsearchKey(e.target.value)} placeholder='Job Title' className='border  px-4 py-1' />
                <button className='border text-white bg-green-600 p-2 hover:border hover:border-green-600
               hover:bg-white hover:text-green-600'>Search</button>
              </div>
              <div className='mx-20'>
                <button onClick={() => setModalstatus(true)} className='border text-white bg-green-600 p-2 hover:border hover:border-green-600
               hover:bg-white hover:text-green-600 rounded'>Add Job</button>
              </div>
            </div>
            <div className='md:px-20 py-5 p-5 mt-10'>
              {allJobs?.length > 0 ?
                allJobs?.map((items, index) => (
                  <div className='shadow border border-gray-500 mb-3'>
                    <div className="md:grid grid-cols-[8fr_1fr] p-5">
                      <div>
                        <h1 className='mb-3 text-2xl font-semibold'>{items?.title}</h1>
                        <hr />
                        <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-600 me-3' />{items?.location}</p>
                        <p className='mt-3'>Job Type : {items?.jtype}</p>
                        <p className='mt-3'>Salary : {items?.salary}</p>
                        <p className='mt-3'>Qualification : {items?.qualification}</p>
                        <p className='mt-3'>Experience : {items?.experience}</p>
                        <p className='text-justify mt-3'>Description : {items?.description}</p>
                      </div>
                      <div className='flex md:justify-center items-start justify-end'>
                        <button onClick={() => deleteJob(items?._id)} className='mt-5 md:mt-0 bg-red-600 text-white p-2 rounded ms-3 shadow hover:border hover:border-red-600
                                     hover:text-red-600 hover:bg-white'>Delete <FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                    </div>
                  </div>
                )) :
                <p>No jobs added</p>
              }
            </div>
          </div>}


          {modalstatus && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {/* title */}
                  <div className="bg-gray-900 p-4 flex justify-between sm:px-6">
                    <h1 className='text-white text-2xl'>Application Form</h1>
                    <FontAwesomeIcon onClick={() => setModalstatus(false)} icon={faXmark} className='text-white fa-2x' />
                  </div>


                  {/* body */}

                  <div className='bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4'>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.title} onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })} placeholder='Job Title' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder='Location' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.jtype} onChange={(e) => setJobDetails({ ...jobDetails, jtype: e.target.value })} placeholder='Job Type' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.salary} onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} placeholder='Salary' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.qualification} onChange={(e) => setJobDetails({ ...jobDetails, qualification: e.target.value })} placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.experience} onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })} placeholder='Experience' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" value={jobDetails.description} onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} placeholder='Description' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                  </div>
                  {/* footer of modal */}
                  <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={handleSubmit} type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3
                                           py-2 text-sm font-semibold text-white shadow-xs hover:bg-white hover:text-green-600 sm:ml-3 sm:w-auto">Submit</button>
                    <button onClick={handleReset} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3
                                           py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 hover:text-orange-500
                                            sm:mt-0 sm:w-auto">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>}

          {viewStatus && <div className='p-10 overflow-x-auto'>
            {allApplication?.length > 0 ? <table className='w-full my-3 shadow'>
              <thead>
                <tr>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'>Sl</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'>Job Title</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'> Name</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'> Qualification</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'> Email</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'>phone</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'>Cover letter</th>
                  <th className='p-3 text-center bg-blue-800 text-white border  border-gray-500'>Resume</th>
                </tr >
              </thead >
              <tbody>
               {allApplication?.map((item,index)=>(
                 <tr key={index}>
                  <td className='border border-gray-500 p-2'>{index+1}</td>
                  <td className='border border-gray-500 p-2'>{item?.jobtitle}</td>
                  <td className='border border-gray-500 p-2'>{item?.fullname}</td>
                  <td className='border border-gray-500 p-2'>{item?.qualification}</td>
                  <td className='border border-gray-500 p-2'>{item?.email}</td>
                  <td className='border border-gray-500 p-2'>{item?.phone}</td>
                  <td className='border border-gray-500 p-2'>{item?.coverletter}</td>
                  <td className='border border-gray-500 p-2'><Link to={`${serverUrl}/pdfUploads/${item?.resume}`}
                   target='_blank' className='text-blue-600 underline'>resume</Link></td>
                </tr>
               ))}
              </tbody>
            </table> :
              <p>No application Yet..</p>
              }
          </div>}
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminCareers
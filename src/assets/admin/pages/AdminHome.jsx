import React from 'react'
import Footer from '../../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserGroup, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function AdminHome() {

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];
    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div className='p-10 '>
                    <div className="md:grid grid-cols-3 mb-5">
                        <div className=' px-5'>
                            <div className='bg-blue-900 p-3 flex rounded text-white'>
                                <FontAwesomeIcon icon={faBook} className='fa-2x' />
                                <div className='text-center px-5'>
                                    <h1>Total Number of Books</h1>
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5 '>
                            <div className='bg-blue-900 p-3 flex rounded text-white'>
                                <FontAwesomeIcon icon={faUserGroup} className='fa-2x' />
                                <div className='text-center px-5'>
                                    <h1>Total Number of Users</h1>
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                        <div className='px-5 '>
                            <div className='bg-blue-900 p-3 flex rounded text-white'>
                                <FontAwesomeIcon icon={faUserTie} className='fa-2x' />
                                <div className='text-center px-5'>
                                    <h1>Total Number of Employees</h1>
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:grid grid-cols-2'>
                        <div className='w-full h-80'>
                            <ResponsiveContainer width="100%" height="100%"> {/*make the barchart responsive with parent tag  */}
                                <BarChart data={data}> {/*indicate the chart - data -attribute holds the data to be display */}
                                    <CartesianGrid strokeDasharray="3 3" /> {/*grid dash - 3px 3px gap*/}
                                    <XAxis dataKey="name" /> {/*represent x axis*/}
                                    <YAxis /> {/*represent y axis - related to the data display*/}
                                    <Tooltip /> {/*indicates the data - square*/}
                                    <Legend /> {/*data fetch with the help of legend*/}
                                    <Bar dataKey="pv" fill="#8884d8" /> {/*indicate the bar, datakey-data to display, fill-colour*/}
                                    <Bar dataKey="uv" fill="#82ca9d" />{/*indicate the bar, datakey-data to display, fill-colour*/}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='w-full h-80'>
                          <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                </PieChart>
                          </ResponsiveContainer>
                          {/*cx - cy -50% -center - vertically horizontally*/}
                               
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AdminHome
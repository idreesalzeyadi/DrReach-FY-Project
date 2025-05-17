import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    return (
        <div className='flex flex-col gap-4 items-center my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>simply browse through our extensive list of trusted doctors.</p>
            <div className='grid grid-cols-auto w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 12).map((item, index) => (

                    <div
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500'
                        key={index}
                    >
                        <img
                            className='bg-blue-50 group-hover:bg-primary transition-colors duration-300'
                            src={item.image}
                            alt=""
                        />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}></p>
                                <p>{item.available ? "Available" : "Not Available"}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>


                ))}
            </div>
            <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-yellow-400 text-white px-12 py-3 rounded-full mt-10'>view All</button>
        </div>
    )
}

export default TopDoctors
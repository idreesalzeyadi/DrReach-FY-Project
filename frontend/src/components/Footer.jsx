import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/*---left section of footer text-- */}

                <div>
                    <img lassName=' w-30' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>"We are committed to making healthcare accessible and hassle-free. Our platform connects patients with experienced doctors, allowing seamless online consultations and easy appointment bookings at trusted hospitals. Your health is our priority—schedule your appointment today and receive expert medical advice from the comfort of your home!"</p>
                </div>

                {/*---center section of footer text-- */}

                <div>
                    <p className='text-xlfont-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li> About</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/*---right section of footer text-- */}

                <div>
                    <p className='text-xlfont-medium mb-10'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-gray-600' v>
                        <li>+92-341-1929949</li>
                        <li>idreesalzeyadi03@gmail.com</li>
                    </ul>

                </div>
            </div>
            <div>
                {/*--copyright -- */}
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright ©2025 AlzEyadi - All Right Reserved.</p>

            </div>
        </div>
    )
}

export default Footer
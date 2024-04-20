import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-between   items-center py-3  bg-green-800   md:px-52 px-3 text-white '>
            <div className='font-bold text-xl'>
                <span className='text-green-600'>&lt;</span>
                Pass
                <span className='text-green-600'>Op/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-3'>
                    <a className='hover:font-bold' href="">Home</a>
                    <a className='hover:font-bold' href="">About</a>
                    <a className='hover:font-bold' href="">Contact us</a>
                </li>
            </ul> */}
            <button className='bg-green-500 rounded-full h-9'>
                <a href="https://github.com/" target='_blank' className='flex justify-between items-center  px-2'>
                <img  className="w-8"src="/icons/github.svg" alt="" />
                <span className='font-bold pl-2'>GitHub</span>
                </a>
            </button>
        </div>
    )
}

export default Navbar

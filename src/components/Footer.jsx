import React from 'react'

const Footer = () => {
    return (
        <div className='  bg-slate-700 w-full min-h-14 flex flex-col justify-center items-center'>
            <div>
            <div className='font-bold text-xl '>
                <span className='text-green-600'>&lt;</span>
                Pass
                <span className='text-green-600'>Op/&gt;</span>
            </div>
            </div>
            <div className='text-white flex justify-center items-center font-bold'>
                <span>Created with </span>
            <lord-icon
                src="https://cdn.lordicon.com/etgnxeer.json"
                trigger="hover">
            </lord-icon>
            <span>use of Sigma Playlist</span>
            </div>
        </div>
    )
}

export default Footer

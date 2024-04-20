import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const Passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [PasswordArray, setPasswordArray] = useState([])

    // This fun. get the password from the database
    const getPasswords=(async()=>{
        let req= await fetch("http://localhost:3000/")
        let password=await req.json()
        console.log(password)
        setPasswordArray(password)
    })

    useEffect(() => {
        // let password = localStorage.getItem("password");
        // if (password) {
        //###     // JSON.parse convert the sting into the javascript object
        //     setPasswordArray(JSON.parse(password))
        // }
        getPasswords()
    }, [])

    // This function is use to copy the selected item
    const copytext = (text) => {
        toast('Copied to the Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    // This function is use to change the show icon 
    const showPassword = (() => {
        Passref.current.type = "text"
        if (ref.current.src.includes("icons/show.png")) {
            ref.current.src = "icons/hide.png"
            Passref.current.type = "text"
        }
        else {

            Passref.current.type = "password"
            ref.current.src = "icons/show.png"
        }
    })

    const savePassword = (async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any similar id is exist thin this will delete that 
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id: form.id})})

            //### This {...form,id:uuidv4()} is use to save the form with the unique id
            setPasswordArray([...PasswordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
            //### JSON.stringify convert the javascript object into json string
            // localStorage.setItem("password", JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }]))
            // console.log([...PasswordArray, form])
            toast('Password Saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast("Error:Password not Saved")
        }
    })

    const editPassword = ((id) => {
        console.log("editing=", id)
        setform({...PasswordArray.filter(item => item.id === id)[0],id: id})
        setPasswordArray(PasswordArray.filter(item => item.id !== id))
        // localStorage.setItem("password", JSON.stringify([...PasswordArray,  {...form,id}]))
    })

    const deletePassword = (async(id) => {
        console.log("Deleting=", id)
        if (confirm("Do you really want to delete this Password")) {
            setPasswordArray(PasswordArray.filter(item => item.id !== id))
            //### This is a API Which is use to delete the data with the help of id
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
            // localStorage.setItem("password", JSON.stringify(PasswordArray.filter(item => item.id !== id)))
        }
        toast('Password Deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    })

    const handleChange = ((e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    })

    return (
        <div className='min-h-[81.63vh]'>
            {/* This is use to implement the toast basic */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            {/* Background */}
            {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform "></div> */}

            {/* Main container */}
            <div className=" md:mycontainer    ">
                <div className='font-bold text-3xl text-center'>
                    <span className='text-green-600'>&lt;</span>
                    Pass
                    <span className='text-green-600'>Op/&gt;</span></div>
                <p className='text-green-600 text-xl text-center'>Your Own Password Manager</p>

                {/* Input part */}
                <div className='flex flex-col gap-4 my-2 items-center' >
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' type="text" className='rounded-full w-full px-4 py-1 text-black border border-green-600' />
                    <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
                        <input value={form.username} onChange={handleChange} name='username' placeholder='Enter Username' type="text" className='rounded-full w-full px-4 py-1 text-black border border-green-600' />
                        <div className='flex relative'>
                            <input ref={Passref} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' type="password" className='rounded-full w-full px-4 py-1 text-black border border-green-600' />
                            <img src="icons/show.png" width={22} className='absolute right-[4px] top-[6px] cursor-pointer' onClick={showPassword} ref={ref} alt="" />
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex gap-2 border border-green-800 justify-center items-center bg-green-500 rounded-full px-3 py-1  w-fit hover:bg-green-400'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>
                <h1 className='font-bold text-2xl py-2'>Your Passwords</h1>
                {PasswordArray.length === 0 && <div>You have no Passwords</div>}
                {PasswordArray.length !== 0 &&
                    <table className="table-auto w-full rounded-lg overflow-hidden mb-3">
                        <thead className='bg-green-700 text-white text-center'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>UserName</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {PasswordArray.map((item) => {
                                return <tr key={item.id}>
                                    <td className='text-center border border-white p-1 cursor-pointer'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            {/* <span></span> */}
                                            <span className="material-symbols-outlined px-2 text-xl pt-1 cursor-pointer" onClick={() => { copytext(item.site) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </td>
                                    <td className='text-center border border-white p-1'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <span className="material-symbols-outlined px-2 text-xl pt-1 cursor-pointer" onClick={() => { copytext(item.username) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </td>
                                    <td className='text-center border border-white p-1'>
                                        <div className='flex justify-center items-center'>
                                            {/* This repeat is use to hide the password but on the tym of copy actual pass. is copy  */}
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <span className="material-symbols-outlined px-2 text-xl pt-1 cursor-pointer" onClick={() => { copytext(item.password) }}>
                                                content_copy
                                            </span>
                                        </div>
                                    </td>
                                    <td className='text-center border border-white p-1 cursor-pointer'>
                                        <span onClick={() => { editPassword(item.id) }} className="material-symbols-outlined mx-2">
                                            edit
                                        </span>
                                        <span onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}

            </div>
        </div>
    )
}

export default Manager

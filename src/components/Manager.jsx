import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
            setpasswordArray(passwords)
        }
    

    useEffect(() => {
        getPasswords()
        
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hidden.png")) {
            // ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            // ref.current.src = "icons/hidden.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = async () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){

            // if any such id exists in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: form.id}) })

        setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        await fetch("http://localhost:3000/", {method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()}) })
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        // console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast.success('Password Saved successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }
    else{
        toast.error('Password not saved!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    }

    const deletePassword = async (id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        let res = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-Type": "application/json"}, body: JSON.stringify({id}) })
        toast.success('Password Deleted!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }
    //     console.log([...passwordArray, form])
    }

    const editPassword = (id) => {
        console.log("editing password with id", id)
        setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <div className="p-2 pt-6 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>

                    <span>Key</span><span className='text-green-900'>Sync</span>
                </h1>
                <p className='text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-6 items-center'>
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' className='rounded-full border border-green-800 w-full px-3' type="text" id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-evenly">
                        <input value={form.username} onChange={handleChange} name='username' placeholder='Enter Username' className='rounded-full border border-green-800 w-fit px-3' type="text" id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='rounded-full border border-green-800 w-fit px-3' type="password" id='password' />
                            <span className='absolute right-[1px] top-[1px] cursor-pointer' onClick={showPassword}>
                                {/* <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" /> */}
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full gap-2 px-3 py-1 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords mx-6 justify-items-center">
                    <h2 className='font-bold text-lg py-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show!</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 px-3 border border-white text-center'><div className='flex items-center justify-between'><a href={item.site} target='_blank'>{item.site}</a><div onClick={() => { copyText(item.site) }} className="size-6 p-1 rounded bg-black hover:bg-slate-600 transition flex items-center justify-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </div></div></td>
                                    <td className='py-2 px-3 border border-white text-center'><div className='flex items-center justify-between'><span>{item.username}</span><div onClick={() => { copyText(item.username) }} className="size-6 p-1 rounded bg-black hover:bg-slate-600 transition flex items-center justify-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </div></div></td>
                                    <td className='py-2 px-3 border border-white text-center'><div className='flex items-center justify-between'><span>{"*".repeat(item.password.length)}</span><div onClick={() => { copyText(item.password) }} className="size-6 p-1 rounded bg-black hover:bg-slate-600 transition flex items-center justify-center cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </div></div></td>
                                    <td className='flex justify-center gap-3 py-2 border border-white text-center'>
                                        <span onClick={()=>{editPassword(item.id)}}><div className=" size-6 p-1 rounded bg-black hover:bg-slate-600 transition flex items-center justify-center cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                                            </svg>
                                        </div></span>
                                        <span onClick={()=>{deletePassword(item.id)}}><div className="size-6 p-1 rounded bg-black hover:bg-slate-600 transition flex items-center justify-center cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <path d="M10 11v6"></path>
                                                <path d="M14 11v6"></path>
                                                <path d="M5 6h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z"></path>
                                            </svg>
                                        </div></span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
        </>

    )
}
export default Manager
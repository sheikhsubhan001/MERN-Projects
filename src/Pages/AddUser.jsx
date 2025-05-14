import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
    };

    const [user, setUser] = useState(users);
    const [isLoading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const inputhandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setUser({ ...user, [name]: value });
    }

    const submitform = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("https://mern-backend-bay.vercel.app/GoTo/Useradd", user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-center" });
                Navigate("/");
            })
            .catch((Error) => {
                toast.error(Error.message, { position: "top-center" });
            });
            setLoading(false);
    }
    return (
        <div className='w-full h-[100vh] absolute flex flex-col items-center bg-[#c5c5c5]'>
            <header className='w-full h-[9vh] lg:h-[11vh] bg-[#1d232a] pt-[1vh] px-[5vw] flex justify-between'>
                <Link to="/" className='no-underline'>
                    <button className='rounded-1 w-[5rem] h-[6vh] bg-gray-700 text-[#eeeeee] flex items-center justify-center gap-1'><i className="fa-solid fa-backward"> </i>Back</button>
                </Link>
                <img src="/Logo.png" alt="loading" className='w-[20vw] sm:w-[17vw] md:w-[15vw] lg:w-[12vw] h-[6vh]' />
            </header>
            {/* <div className='border-1 '> */}
            <h2 className='Frijole text-center py-[2rem] text-shadow-lg'>Add New User</h2>
            <div className='w-[300px] h-[50vh] xs:h-[55vh] rounded-2 border bg-[#fff] shadow-lg'>
                <form className='flex flex-col items-center gap-[1.8vh] mt-[2rem]' onSubmit={submitform}>
                    <label htmlFor="name" className='font-bold'>Name:
                        <input className='form-control w-auto' type="text" onChange={inputhandler} id='name' name='name' required placeholder='Enter your Name...' />
                    </label>

                    <label htmlFor="email" className='font-bold'>Email:
                        <input className='form-control w-auto' type="email" onChange={inputhandler} required id='email' name='email' placeholder='Enter Email...' />
                    </label>

                    <label htmlFor="address" className='font-bold'>Address:
                        <input className='form-control w-auto' type="text" onChange={inputhandler} required id='address' name='address' placeholder='Enter Address' />
                    </label>

                    <button className='bg-[#0000Ff] text-white my-[50px] w-[5.5rem] h-[2.5rem] rounded-2'>
                        {isLoading ? (
                            <span className='loading loading-dots loading-lg'></span>
                        ) : (
                            <span>Submit</span>
                        )}
                        </button>
                </form>
            </div>
            {/* </div> */}
        </div>
    )
}

export default AddUser

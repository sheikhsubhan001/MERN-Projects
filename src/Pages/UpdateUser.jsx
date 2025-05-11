import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const initialUser = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:7000/GoTo/getsingle/${id}`)
      .then((response) => {
        setUser(response.data.UserExist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:7000/GoTo/UpdateUser/${id}`, user)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((Error) => {
        toast.error(Error.message, { position: "top-center" })
        console.error(Error);
      });
  };

  return (
    <div className='w-full h-[100vh] absolute flex flex-col items-center bg-[#c5c5c5]'>
      <header className='w-full h-[9vh] lg:h-[11vh] bg-[#2f3541] pt-[1vh] px-[5vw] flex justify-between'>
        <Link to="/" className='no-underline'>
          <button className='rounded-1 w-[5rem] h-[6vh] bg-[#181b20] text-[#eeeeee] flex items-center justify-center gap-1'><i className="fa-solid fa-backward"> </i>Back</button>
        </Link>
        <img src="/Logo.png" alt="loading" className='w-[20vw] sm:w-[17vw] md:w-[15vw] lg:w-[12vw] h-[6vh]' />
      </header>
        <h2 className='text-center py-[2rem] text-shadow-lg'>Update User</h2>
        <div className='w-[300px] h-[50vh] rounded-2 border bg-[#fff] shadow-lg'>
          <form className='flex flex-col items-center gap-[1.8vh] mt-[25px]' onSubmit={submitForm}>
            <label htmlFor="name" className='font-bold'>Name:
              <input
                className='form-control w-auto'
                value={user.name || ""}
                type="text"
                onChange={inputHandler}
                id='name'
                name='name'
                required
                placeholder='Enter your Name...'
              />
            </label>

            <label htmlFor="email" className='font-bold'>Email:
              <input
                className='form-control w-auto'
                value={user.email || ""}
                type="email"
                onChange={inputHandler}
                required
                id='email'
                name='email'
                placeholder='Enter Email...'
              />
            </label>

            <label htmlFor="address" className='font-bold'>Address:
              <input
                className='form-control w-auto'
                value={user.address || ""}
                type="text"
                onChange={inputHandler}
                required
                id='address'
                name='address'
                placeholder='Enter Address'
              />
            </label>

            <input type="submit" className='btn btn-primary' value="Update" />
          </form>
        </div>
      </div>
  );
};

export default UpdateUser;
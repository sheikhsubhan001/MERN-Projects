import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:7000/GoTo/getUser");
        setUsers(res.data.UserData);
      } catch (error) {
        console.log("Error in Fetching ", error);
      }
    };
    fetchdata();
  }, []);

  const DeleteUser = async (userId) => {
    await axios.delete(`http://localhost:7000/GoTo/DeleteUser/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success(response.data.message, { position: "top-center" })
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
        console.log(error);
      })


  }
  return (
    <div className='w-full absolute'>
      <header className='w-full h-[9vh] lg:h-[11vh] bg-[#2f3541] pt-[1vh] px-[5vw] flex justify-between fixed z-2'>
        <img src="/src/image-removebg-preview (12).png" alt="loading" className='w-[20vw] sm:w-[17vw] md:w-[15vw] lg:w-[12vw] h-[6vh]' />
        <Link to="/add">
          <button type='submit' className='rounded-1 w-[3rem] h-[6vh] bg-[#181b20] text-[#eeeeee]'><i className="fa-solid fa-user-plus"></i></button>
        </Link>
      </header>
      <div className='w-full bg-[#eeeeee] pt-[9vh] border-1 py-[0.3rem] fixed z-1'>
        <h3 className='text-center py-[1rem]'>User Records</h3>
      </div>
      <div className='bg-[#dddddd] w-full px-[5vw] pt-[8rem] pb-[3rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto  overflow-auto scrollbar-hide'>
        {/* records */}
        {Array.isArray(users) && users.map((user, index) => {
          return (
            <div key={index} className='mt-[1rem] p-[1rem] bg-[#fff] shadow-lg rounded-tl-[1.5rem] rounded-br-[1.5rem]'>
              <div className='flex justify-between'>
                <h5>{index + 1})</h5>
                <div className='flex items-center gap-3'>
                  <Link to={`/Update/${user._id}`}>
                    <button>
                      <i className="text-[1.3rem] fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                  <button onClick={() => DeleteUser(user._id)}>
                    <i className="text-[#FF0005] text-[1.3rem] fa-solid fa-trash-can-arrow-up"></i>
                  </button>
                </div>
              </div>
              <h4 className='text-wrap'>{user.name}</h4>
              <h6 className='text-wrap'>{user.email}</h6>
              <p className=' text-wrap pt-[0.5rem]'>{user.address}</p>
            </div>
          );
        })}
      </div>

      <footer className='text-center fixed bottom-[0px] border-1 w-full bg-[#eeeeee] md:h-[3rem] md:mt-[1.5rem]'>© All Rights Reserved | Developed by MSH Technology</footer>


    </div>
  );
}

export default Home;

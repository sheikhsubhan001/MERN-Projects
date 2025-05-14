import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [LoadingId, setLoadingId] = useState();
  const [isAnimate, setAnimation] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("https://mern-backend-bay.vercel.app/GoTo/getUser");
        setUsers(res.data.UserData);
        setAnimation(false);
      } catch (error) {
        console.log("Error in Fetching ", error);
        setAnimation(false);
      }
    };
    fetchdata();
  }, []);

  const DeleteUser = async (userId) => {
    setLoadingId(userId);
    setLoading(true);
    await axios.delete(`https://mern-backend-bay.vercel.app/GoTo/DeleteUser/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success(response.data.message, { position: "top-center" })
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
        console.log(error);
      })
    setLoading(false);
  }


  return (
    <div className='w-full absolute min-h-screen bg-[#eeeeee]'>
      <header className='w-full h-[9vh] lg:h-[11vh] bg-[#1d232a] pt-[1vh] px-[5vw] flex justify-between fixed z-2'>
        <img src="/Logo.png" alt="loading" className='w-[20vw] sm:w-[17vw] md:w-[15vw] lg:w-[12vw] h-[6vh]' />
        <Link to="/add">
          <button type='submit' className='rounded-1 w-[3rem] h-[6vh] bg-gray-700 text-[#eeeeee]'><i className="fa-solid fa-user-plus"></i></button>
        </Link>
      </header>
      <div className='w-full bg-[#eeeeee] pt-[9vh] border-1 py-[0.3rem] fixed z-1'>
        <h3 className='text-center py-[1rem] text-shadow-lg'>User Records</h3>
      </div>
      <div className='bg-[#dddddd] w-full px-[5vw] pt-[10rem] sm:pt-[8rem] pb-[4rem] xs:pb-[3rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto  overflow-auto scrollbar-hide'>
        {/* records */}

        { isAnimate ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="mt-[1rem] p-4 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))
          ) : (
            Array.isArray(users) && users.map((user, index) => (
              <div key={index} className='mt-[1rem] p-4 bg-white rounded-lg shadow-md'>
                <div className='flex justify-between'>
                  <h5>{index + 1})</h5>
                  <div className='flex items-center gap-3'>
                    <Link to={`/Update/${user._id}`}>
                      <button>
                        <i className="text-[1.3rem] fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <button onClick={() => DeleteUser(user._id)}>
                      {isLoading && LoadingId == user._id ?
                        (
                          <span className="loading loading-bars loading-md text-error"></span>
                        ) : (
                          <i className="text-[#FF0005] text-[1.3rem] fa-solid fa-trash-can-arrow-up"></i>
                        )}

                    </button>
                  </div>
                </div>
                <h4 className='text-wrap'>{user.name}</h4>
                <h6 className='text-wrap'>{user.email}</h6>
                <p className=' text-wrap pt-[0.5rem]'>{user.address}</p>
              </div>
            )
          )
            )
        }


      </div>

      <footer className='text-center absolute bottom-[0px] border-1 w-full bg-[#eeeeee] md:h-[3rem] md:mt-[1.5rem]'>© All Rights Reserved | Developed by MSH Technology</footer>


    </div>
  );
}

export default Home;

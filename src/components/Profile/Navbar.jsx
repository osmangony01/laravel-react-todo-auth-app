import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from '../../routes/axiosInstance';
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {

    const { user, setUser, token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    // const tk = localStorage.getItem('access_token');

    const handleLogOut = async () => {
        try {
            const res = await axiosInstance.post(`logout?token=${token}`);
            console.log(res);
            if (res?.status==200) {
                localStorage.removeItem('access_token');
                setUser(null);
                setToken(null);
                navigate("/", { replace: true });
            }
    
        } catch (error) {
            // Handle error response
            if (error.response) {
                console.log(error.response.data); // Validation errors or other error details
                const errors = error.response.data.errors;
                console.log(errors)
                // You can update the state or display an error message to the user
                // For example, setPassError(errors.password[0]);
            } else {
                console.error('Error with no response from server:', error.message);
            }
        }
       
    }

   // console.log(user)

    return (
        <div className='flex justify-between items-center py-2 px-8 bg-white '>
            <div>Hi, {user?.name}</div>
            <div className='flex justify-center items-center'>
                <div onClick={handleLogOut} className="hover:text-blue-500 hover:font-semibold text-sm  cursor-pointer pr-3" >
                    <a>Sign Out</a>
                </div>
                <div>
                    <label className="btn btn-ghost btn-circle avatar m-0">
                        <div className="w-10 rounded-full">
                            {user?.photoURL ? <img src={user?.photoURL} alt="" className='bg-slate-200 rounded-full' title={user?.displayName} />
                                : <span className='first-line:' title={user?.displayName}><FaUserCircle size={40}></FaUserCircle></span>}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
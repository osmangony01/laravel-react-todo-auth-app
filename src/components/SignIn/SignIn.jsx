

import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axiosInstance from "../../routes/axiosInstance";

const SignIn = () => {

    const [passShow, setPassShow] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const login = async (userData) => {
        try {
            const res = await axiosInstance.post('/login', { ...userData });
            console.log(res);
            if (res.status == 200) {
                navigate("/profile", { replace: true });
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

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setError("")
        if (email === "" || password === "") {
            return;
        }

        const userData = { email, password };
        //console.log(userData);
        login(userData)
        form.reset();

    }


    return (
        <div className='pt-8 pb-16'>
            <div className='w-2/5 max-sm:w-11/12 max-md:w-2/4 lg:w-1/3 bg-white mx-auto py-10 px-10 max-sm:px-4 shadow rounded'>
                <h3 className='text-center text-3xl font-semibold max-sm:text-2xl'>Sign In</h3>
                <hr className='my-6' />
                <p className='text-red-600 text-center text-sm mb-4'>{error}</p>
                <form action="" className='px-4' onSubmit={handleLogin}>
                    <div className='mb-3'>
                        <label htmlFor="" className='block mb-1.5'>Email</label>
                        <input type="text" name="email" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your email' />
                    </div>
                    <div className='mb-3 relative'>
                        <label htmlFor="" className='block  mb-1.5'>Password</label>
                        <input type={passShow ? "password" : "text"} name="password" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your password' />
                        <small onClick={() => setPassShow(!passShow)} className='absolute right-6 top-11 text-base text-slate-600' required>
                            {passShow ? <span>{<FaEyeSlash></FaEyeSlash>}</span> : <span>{<FaEye></FaEye>}</span>}
                        </small>
                    </div>
                    <button type="submit" className='w-full py-2 mt-5 bg-white border border-purple-400 hover:bg-purple-800 text-base text-black hover:text-white rounded'>Sign In</button>
                    <p className='mt-2 text-sm  text-slate-600 text-end'>Don't have an account? <Link to="/sign-up" className='text-blue-700 font-semibold'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
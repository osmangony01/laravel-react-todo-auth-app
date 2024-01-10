
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../routes/axiosInstance";




const SignUp = () => {

    const [passError, setPassError] = useState("");
    const navigate = useNavigate();

    const register = async (userData) => {
        try {
            const res = await axiosInstance.post('/register', { ...userData });
            console.log(res);
            if (res.status == 200) {
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
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        setPassError("");
        if (password.length < 6) {
            setPassError("At least 6 characters needed!!");
            return;
        }

        const userData = { name, email, password };
        //console.log(userData)
        register(userData);
        //form.reset();
    }

    //console.log(watch("example"));

    return (
        <div className='pt-6'>
            <div className='w-2/5 max-sm:w-11/12 max-md:w-3/4 max-lg:w-1/2 bg-white mx-auto py-8 px-12 max-sm:px-4 shadow rounded'>
                <h3 className='text-center text-3xl font-semibold'>Sign Up</h3>
                <hr className='my-6' />
                <form action="" className='px-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="" className='block  mb-1.5'>Full Name</label>
                        <input type="text" name="name" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your name'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='block mb-1.5'>Email</label>
                        <input type="text" name="email" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your email' required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='block  mb-1.5'>Password</label>
                        <input type="password" name="password" className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Enter your password' required/>
                        <small>{passError}</small>
                    </div>
                    <button className='w-full py-2 mt-5 bg-white border border-purple-400 hover:bg-purple-800 text-base text-black hover:text-white rounded' >Sign Up</button>
                    <p className='mt-2 text-sm  text-slate-600 text-end'>Already have an account? <Link to="/" className='text-blue-700 font-semibold'>Sign In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch(error => console.log(error.message))
    }

   // console.log(user)

    return (
        <div className='flex justify-between items-center py-2 px-8 bg-white '>
            <div>Hi, {user?.displayName}</div>
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
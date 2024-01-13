import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from "../routes/axiosInstance.js";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    //const navigate = useNavigate();

    const register = async (name, email, password) => {
        try {
            const res = await axiosInstance.post('/register', { name, email, password });
            console.log(res);
            if (res.data) {
                //navigate("/", { replace: true });
                // setUser(res.data.user);
                // setLoading(true);
                return true
            }
            else {
                return false;
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
            return false;
        }
    }

    const login = async (email, password) => {
        try {
            const res = await axiosInstance.post('/login', { email, password });
            console.log(res);
            console.log(res.status)
            if (res.data?.user) {
                setUser(res.data.user);
                setLoading(true);
                saveToken(res.data.access_token);
                return true;
            }
            else {
                return false;
            }    
        }
        catch (error) {
            if (error.response)
                console.log(error.response.data);
            else
                console.error('Error with no response from server:', error.message);
            return false;
        }
    }

    const logout = async () => {
        try {
            const res = await axiosInstance.post('/logout');
            console.log(res);
            if (res.status == 200) {
                //navigate("/", { replace: true });
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                const errors = error.response.data.errors;
            } else {
                console.error('Error with no response from server:', error.message);
            }
        }
    }

    const saveToken = (token) => {
        setToken(token);
        localStorage.setItem("access_token", token)
    }

    const getToken = () => {
        const tk = localStorage.getItem("access_token")
        if (tk) {
            if (!token) {
                setToken(tk);
            }
           
            return tk;
        } else {
            return "";
        }
    }

    const authStateChange = async () => {
        const tk = getToken();
        if (!user) {
            if (tk) {
                try {
                    const res = await axiosInstance.get(`profile?token=${tk}`);
                    console.log(res);
                    console.log(res.status)
                    if (res.data?.user) {
                        setUser(res.data.user);
                        return true;
                    }
                    else {
                        return false;
                    }    
                }
                catch (error) {
                    if (error.response)
                        console.log(error.response.data);
                    else
                        console.error('Error with no response from server:', error.message);
                    return false;
                }
            }
        }
    }

    useEffect(() => {
        authStateChange();
    },[])

    const authInfo = {
        user,
        loading,
        token,
        register,
        login,
        logout,
        setUser,
        setToken
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


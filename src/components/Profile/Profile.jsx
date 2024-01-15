
import React, { createContext, useContext, useEffect, useState } from 'react';
import Navbar from "./Navbar";
import axiosInstance from '../../routes/axiosInstance.js'
import TaskList from './TaskManagement/TaskList.jsx';
import { AuthContext } from '../../provider/AuthProvider.jsx';

export const TaskContextAPI = createContext(null);

const Profile = () => {

    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false);

    // fetch data from database
    const fetchTaskData = async () => {
        // const response = await axiosInstance.get(`/todo`, { params: { email } });
        // const data = response.data;
        // if (data) {
        //     setTasks(data);
        //     setReload(true);
        // }
        const id = user?.id;
        try {
            const res = await axiosInstance.get(`/tasks/${id}`);
            console.log(res);
            const data = res.data;
            if (data) {
                setTasks(data.tasks)
                setReload(true);
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


    useEffect(() => {
        fetchTaskData();
    }, [reload, user])

    const info = {
        tasks,
        reload,
        setTasks,
        setReload
    }

    return (
        <div>
            <Navbar></Navbar>
            <TaskContextAPI.Provider value={info}>
                <div>
                    <TaskList></TaskList>
                </div>
            </TaskContextAPI.Provider>

        </div>
    );
};

export default Profile;

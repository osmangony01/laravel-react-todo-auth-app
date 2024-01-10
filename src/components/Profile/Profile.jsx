import React, { createContext, useContext, useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import TaskList from './TaskList/TaskList';
import axiosInstance from '../../routes/axiosInstance';
import { AuthContext } from '../../provider/AuthProvider';
export const TaskContextAPI = createContext(null);

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false);

    // fetch data from database
    const fetchTaskData = async () => {
        if (user && user.email) {
            const email = user.email;
            const response = await axiosInstance.get(`/todo`, {params:{email}});
            const data = response.data;
            if (data) {
                setTasks(data);
                setReload(true);
            }
        }
    }

    useEffect(() => {
        const email = user?.email;
        console.log(email)
        fetchTaskData();
    }, [reload, user])

    const info = {
        tasks,
        reload,
        setTasks,
        setReload
    }
    //console.log(tasks)

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

import React, { Children, createContext, useContext, useEffect, useState } from 'react';

import axiosInstance from '../routes/axiosInstance.js'

export const TaskContextAPI = createContext(null);

const TaskProvider = ({ children }) => {


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

        try {
            const res = await axiosInstance.get('/tasks');
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
    }, [reload])

    const info = {
        tasks,
        reload,
        setTasks,
        setReload
    }
    //console.log(tasks)

    return (
        <TaskContextAPI.Provider value={info}>
            {children}
        </TaskContextAPI.Provider>
    );
};

export default TaskProvider;

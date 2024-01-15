import React, { useContext, useEffect, useState } from 'react';
import AddTask from './AddTask';
import Task from './Task';
import { TaskContextAPI } from '../Profile';
import { AuthContext } from '../../../provider/AuthProvider';
import axiosInstance from '../../../routes/axiosInstance';

const TaskList = () => {
    const { user } = useContext(AuthContext);
    const { tasks, setTasks } = useContext(TaskContextAPI);
    const [allTask, setAllTask] = useState([]);
    const [addModel, setAddModal] = useState(false);

    // to handle task pop-up modal
    const handleAddModal = (status) => {
        setAddModal(status)
    }

    // ---------- start searching-------------------

    const [searchTerm, setSearchTerm] = useState('');
    // Use a state to keep track of the timeout
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const id = user?.id;
            try {
                // Fetch tasks based on the search term
                const response = await axiosInstance.get(`/task/search?user_id=${id}&title=${searchTerm}`);
                //setTasks(response.data);
                console.log(response)
                if (response.data?.tasks) {
                    setTasks(response.data.tasks)
                }

            } catch (error) {
                if (error.response) {
                    const errors = error.response.data
                    console.log(errors);
                    if (errors.status == 404) {
                        console.log('search data is not found!')
                        setTasks(null)
                    }
                } else {
                    console.error('Error with no response from server:', error.message);
                }
            }
        };

        // Clear the existing timeout when the user types
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set a new timeout if searchTerm has a value
        if (searchTerm) {
            const timeoutId = setTimeout(() => {
                fetchData();
            }, 1000);

            // Save the timeout ID in the state
            setSearchTimeout(timeoutId);
        }
        // Clean up the timeout when the component unmounts or when the search term changes
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTerm]);
    // -------------------- end searching ----------------

    const handleFilter = (e) => {
        e.preventDefault();

        const form = e.target;
    }

    // to assign task of this components state form context api
    useEffect(() => {
        setAllTask(tasks);
    }, [tasks])

    console.log(tasks)

    return (
        <div className=' w-full lg:w-[1000px] mx-auto border px-12 pt-6 pb-10 bg-white mt-3 h-full'>
            <h1 className='text-2xl text-center pb-8 font-semibold'>Welcome to Task Manager</h1>
            <div>
                <button onClick={() => handleAddModal(true)} className='px-2.5 py-1.5 bg-blue-500 rounded my-4 font-semibold text-white hover:bg-blue-700'>Add Task</button>
                {<AddTask status={addModel} handleAddModal={handleAddModal}></AddTask>}

                <div className='flex justify-end items-center my-6'>
                    <label className='pb-1.5 mr-2'>Search</label>
                    <input type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} name="task_title" className='w-full sm:w-[50%] md:w-[350px]  box-border py-1.5 px-3 rounded  border border-slate-300 outline-none placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' placeholder='Search by title' />
                </div>

                <div>
                    <form onSubmit={handleFilter} className='flex  flex-col md:flex-row justify-between my-6 items-end'>
                        <div className='mb-2'>
                            <label className='pb-1.5'>Due Date</label>
                            <input type='date' name="task_due_date" className='task-input  placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' />
                        </div>
                        <div className='mb-3'>
                            <label className='pb-1.5'>Priority Level</label>
                            <select name="task_priority" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' >
                                <option value="" disabled>Select a priority level</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High" >High</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='px-4 py-1.5 border border-violet-700 text-black rounded hover:bg-violet-700 hover:text-white '>Filter
                            </button>
                        </div>
                    </form>
                </div>
                <div className='overflow-x-auto w-full '>
                    {
                        !allTask && <div className='my-3 text-red-500 text-center font-bold'>Search result not Found!</div>
                    }
                    <table className='table w-full'>
                        {allTask?.length >= 1 && <thead className='bg-blue-100'>
                            <tr>
                                <th className='border p-3 text-center'>#</th>
                                <th className='border p-3 text-center'>Title</th>
                                <th className='border p-3 text-center'>Due Date</th>
                                <th className='border p-3 text-center'>Priority</th>
                                <th className='border p-3 text-center'>Description</th>
                                <th className='border p-3 text-center'>Action</th>
                            </tr>
                        </thead>}
                        <tbody>
                            {
                                allTask?.map((item, index) => {
                                    return <Task item={item} index={index}></Task>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
import React, { useContext, useState } from 'react';
import axiosInstance from '../../../routes/axiosInstance';
import { RxCross1 } from "react-icons/rx";
import Swal from 'sweetalert2';
import { TaskContextAPI } from '../Profile';



const EditTask = ({ status, handleEditModal, item }) => {

    const { reload, setReload } = useContext(TaskContextAPI);
    const modal = status;

    const [taskTitle, setTaskTitle] = useState(item.task_title)
    const [dueDate, setDueDate] = useState(item.task_due_date)
    const [priority, setPriority] = useState(item.task_priority)
    const [description, setDescription] = useState(item.task_description)

    //  // to handle edit modal pop-up
    const handleModal = () => {
        handleEditModal(false)
    }

    // handle to update task
    const updateTask = async (taskData) => {
        // const res = await axiosInstance.patch('/update-task', { ...taskData });
        // const data = res.data;
        // console.log(data);
        // if (data.ok) {
        //     setReload(!reload);
        //     Swal.fire({
        //         position: 'center',
        //         icon: 'success',
        //         title: 'Task is updated successfully',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        // }

        try {
            const res = await axiosInstance.put(`/update-task/${item.id}`, { ...taskData });
            console.log(res);
            if (res.data.status == 202) {
                setReload(!reload);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Task is updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
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

    // handle submit for update task
    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = {
            task_title: taskTitle,
            task_due_date: dueDate,
            task_priority: priority,
            task_description: description
        };
        updateTask(taskData)
        handleEditModal(false);
    }

    return (
        <div>
            {
                modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                    <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block'>
                        <span onClick={handleModal} className='absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={20}></RxCross1></span>
                        <div className="p-10">
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-center font-semibold text-2xl pb-4'>Update Task</h1>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Title</label>
                                    <input name="task_title" onChange={(e) => setTaskTitle(e.target.value)} className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' placeholder='Enter title'  value={taskTitle} />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Due Date</label>
                                    <input name="task_due_date" onChange={(e) => setDueDate(e.target.value)} type='date' className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2'  value={dueDate} />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Priority Level</label>
                                    <select onChange={(e) => setPriority(e.target.value)} name="task_priority" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' value={priority}>
                                        <option value="" disabled>Select a priority level</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High" >High</option>
                                    </select>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Description</label>
                                    <textarea name="task_description" onChange={(e) => setDescription(e.target.value)} className="task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2" rows={3} placeholder="Type description"  value={description}></textarea>
                                </div>
                                <div className='mt-4'> <button type='submit' className='text-right px-4 py-1.5 bg-[#5e3cf7fb] text-white rounded shadow-md hover:bg-[#3d3bbefb]'>Update Task</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default EditTask;
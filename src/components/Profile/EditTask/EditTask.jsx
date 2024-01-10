import React, { useContext, useState } from 'react';
import axiosInstance from '../../../routes/axiosInstance';
import { RxCross1 } from "react-icons/rx";
import Swal from 'sweetalert2';
import { TaskContextAPI } from '../Profile';

const EditTask = ({ status, handleEditModal, item }) => {
    
    const { reload, setReload } = useContext(TaskContextAPI);
    const modal = status;

    const [taskTitle, setTaskTitle] = useState(item.taskTitle)
    const [dueDate, setDueDate] = useState(item.dueDate)
    const [priority, setPriority] = useState(item.priority)
    const [description, setDescription] = useState(item.description)
    
    //  // to handle edit modal pop-up
    const handleModal = () => {
        handleEditModal(false)
    }
    
    // handle to update task
    const updateTask = async (taskData) => {
        const res = await axiosInstance.patch('/update-task',{ ...taskData });
        const data = res.data;
        console.log(data);
        if (data.ok) {
            setReload(!reload);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Task is updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    // handle submit for update task
    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = {id:item._id, taskTitle, dueDate, priority, description };
        updateTask(taskData)
        handleEditModal(false);
    }

    return (
        <div>
            {
                modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                    <div className='relative bg-white rounded-md shadow-lg w-[500px]  text-[15px] mx-auto h-[500px] '>
                        <span onClick={handleModal} className='absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={20}></RxCross1></span>
                        <div className="p-10">
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-center font-semibold text-2xl pb-4'>Update Task</h1>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Title</label>
                                    <input onChange={(e)=>setTaskTitle(e.target.value)} className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' placeholder='Enter title' name="taskTitle" value={taskTitle} />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Due Date</label>
                                    <input onChange={(e)=>setDueDate(e.target.value)} type='date' className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' name="dueDate" value={dueDate} />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Priority Level</label>
                                    <select onChange={(e)=>setPriority(e.target.value)} name="priority" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' value={priority}>
                                        <option value="" disabled>Select a priority level</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High" >High</option>
                                    </select>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Description</label>
                                    <textarea onChange={(e)=>setDescription(e.target.value)} className="task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2" rows={3} placeholder="Type description" name="description" value={description}></textarea>
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
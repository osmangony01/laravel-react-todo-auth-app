import { RxCross1 } from "react-icons/rx";
import axiosInstance from "../../../routes/axiosInstance.js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { TaskContextAPI } from "../Profile.jsx";
import { AuthContext } from "../../../provider/AuthProvider.jsx";



const AddTask = ({ status, handleAddModal }) => {

    const { user, token } = useContext(AuthContext);
    const { reload, setReload } = useContext(TaskContextAPI);
    const modal = status;

    // for task data
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // to handle add pop-up modal
    const handleModal = () => {
        handleAddModal(false)
    }

    // handle to create task
    const createTask = async (formData) => {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        };
        
        try {
            const res = await axiosInstance.post('/create-task', formData, config);
            console.log(res);
            if (res.data.status == 201) {
                setReload(!reload);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Task is created successfully',
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

    // to handle for adding task
    const handleSubmit = (e) => {
        e.preventDefault();

        // const form = e.target;
        // const task_title = form.task_title.value;
        // const task_due_date = form.task_due_date.value;
        // const task_priority = form.task_priority.value;
        // const task_description = form.task_description.value;
        const id = user?.id;

        console.log(title, dueDate, priority, description, id);

        const formData = new FormData();
        formData.append('task_title', title);
        formData.append('task_due_date', dueDate);
        formData.append('task_priority', priority);
        formData.append('task_description', description);
        formData.append('id', id);

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i]);
        }

       
        // const taskData = { task_title, task_due_date, task_priority, task_description, id };
        // //console.log(taskData)
        createTask(formData);
        // form.reset();

        setTitle('');
        setDueDate('');
        setPriority('');
        setDescription('');
        setImages([]);
        handleAddModal(false);
    }
    
    return (
        <div>
            {
                modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                    <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block'>
                        <span onClick={handleModal} className='absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={20}></RxCross1></span>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-center font-semibold text-2xl pb-4'>Create Task</h1>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Title</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="task_title" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' placeholder='Enter title' />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Due Date</label>
                                    <input type='date' onChange={(e) => setDueDate(e.target.value)} value={dueDate} name="task_due_date" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Priority Level</label>
                                    <select onChange={(e) => setPriority(e.target.value)} name="task_priority"  className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' >
                                        <option value="" disabled>Select a priority level</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High" >High</option>
                                    </select>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Choose Images</label>
                                    <input type="file" onChange={(e) => setImages(e.target.files)}  name="images" className='task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2' placeholder='choose images' multiple/>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <label className='pb-1'>Description</label>
                                    <textarea name="task_description" onChange={(e) => setDescription(e.target.value)} value={description} className="task-input placeholder:text-sm hover:border-[#5e3cf7fb] hover:border-2" rows={3} placeholder="Type description" ></textarea>
                                </div>
                                <div className='mt-4'> <button type='submit' className='text-right px-4 py-1.5 bg-[#5e3cf7fb] text-white rounded shadow-md hover:bg-[#3d3bbefb]'>Create Task</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};



export default AddTask;
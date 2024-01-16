import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Profile from "../components/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
// import TaskList from "../components/Profile/TaskManagement/TaskList";
// import FileUpload from "../components/Profile/TaskManagement/FIleUpload";
// import FileUpload2 from "../components/Profile/TaskManagement/FileUpload2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <SignIn></SignIn>
            },
            {
                path: "/sign-up",
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
    },
    // {
    //     path: "/task-list",
    //     element: <TaskList></TaskList>
    // }
    // {
    //     path: "/file-upload",
    //     element: <FileUpload></FileUpload>
    // },
    // {
    //     path: "/upload",
    //     element: <FileUpload2></FileUpload2>
    // }
    
]);


export default router;
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Profile from "../components/Profile/Profile";
import TaskList from "../components/Profile/TaskManagement/TaskList";
import PrivateRoute from "./PrivateRoute";


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
    
]);


export default router;
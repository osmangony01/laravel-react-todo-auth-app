import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Profile from "../components/Profile/Profile";
import TaskList from "../components/Profile/TaskManagement/TaskList";


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
        element: <Profile></Profile>
    },
    {
        path: "/task-list",
        element: <TaskList></TaskList>
    }
    
]);


export default router;
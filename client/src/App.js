import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


// Import All Components

import Username from './components/Username';
import Password from "./components/Password";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";



// root router
const router = createBrowserRouter([
    {
        path:'/',
        element:<Username></Username>
    },
    {
        path:'/register',
        element: <Register></Register>
    },
    {
        path:'/password',
        element:<Password></Password>
    },
    {
        path:'/reset',
        element:<Reset></Reset>
    }, 
    {
        path:'/recovery',
        element:<Recovery></Recovery>
    },
    {
        path:'/profile',
        element:<Profile></Profile>
    },
    {
        path:'*',
        element:<PageNotFound></PageNotFound>
    }
])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}
import { lazy } from "react";

const Login = lazy(()=>import("components/Login"))
const Registeration = lazy(()=>import('components/Registeration'))
const Dashboard = lazy(()=>import('components/Dashboard'))
const TaskManagement = lazy(()=>import('components/TaskManagement'))

export const routes=[
    {
        path:'/',
        element:Login,
        tittle:'Login'
    },
    {
        path:'/Register',
        element:Registeration,
        tittle:'Registeration'
    },
    {
        path:'/Dashboard',
        element:Dashboard,
        tittle:'Dashboard'
    },
    {
        path:'/TaskManagement',
        element:TaskManagement,
        tittle:'TaskManagement'
    }
]
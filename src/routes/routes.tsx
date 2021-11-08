import { IRuta } from 'types'
import { routAdmin, routEnfe } from './definition';
import Home from 'pages/Home';
import History from 'pages/HIstory';
import Alumnos from 'pages/Alumnos';
import Enfermeros from 'pages/Enfermeros';
import Dashboard from 'pages/Dashboard';
import Profile from 'pages/Profile';
export const routerAdmin: IRuta[] = [
    {
        id: 1,
        path: routAdmin.home,
        icon: 'grid layout',
        name: "Home",
        component: <Home />
    },
    {
        id: 2,
        path: routAdmin.alumnos,
        icon: 'users',
        name: "Alumnos",
        component: <Alumnos />
    },
    {
        id: 3,
        path: routAdmin.enfermeros,
        icon: 'user doctor',
        name: "Medicos",
        component: <Enfermeros />
    },
    {
        id: 4,
        path: routAdmin.history,
        icon: 'chart pie',
        name: "Historial",
        component: <History />
    },
    {
        id: 5,
        path: routAdmin.profile,
        icon: 'chart pie',
        name: "Perfil",
        component: <Profile />
    }
]

interface IRouter{
    updateStatus:(id_alerta:string,id_enfermero:string)=>void
}
export function routerE(fun:IRouter):IRuta[]{
    return[
        {
            id: 1,
            path: routEnfe.home,
            icon: 'grid layout',
            name: "Home",
            component: <Dashboard updateStatus={fun.updateStatus}/>
        },
        {
            id: 2,
            path: routEnfe.profile,
            icon: 'chart pie',
            name: "Perfil",
            component: <Profile />
        }
    ]
}
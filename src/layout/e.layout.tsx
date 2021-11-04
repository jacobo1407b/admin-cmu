import {useState} from 'react';
import RouterE from "routes/enfermero.router";
import SideBar from "components/Sidebar";
import Appbar from "components/Appbar";
import { routerE } from 'routes/routes'
import {routEnfe} from 'routes/definition';
import useInitial from 'hooks/getInitialSol';
import useSocket from 'hooks/useSocket';

export default function Elayout() {
    const [open, setopen] = useState<boolean>(false);
    
    const {updateStatus}= useSocket()
    useInitial()
    const routerEnfermero = routerE({updateStatus})
    return (
        <div>
            
            <SideBar items={routerEnfermero} open={open} />
            <div className="main-content">
                <Appbar pathP={routEnfe.profile} open={open} setopen={setopen}/>
                <main>
                    <RouterE updateStatus={updateStatus}/>
                </main>
            </div>
        </div>
    )
}

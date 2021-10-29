import {useState} from 'react';
import RouterE from "routes/enfermero.router";
import SideBar from "components/Sidebar";
import Appbar from "components/Appbar";
import { routerE } from 'routes/routes'
import {routEnfe} from 'routes/definition';

export default function Elayout() {
    const [open, setopen] = useState<boolean>(false);
    return (
        <div>
            <SideBar items={routerE} open={open} />
            <div className="main-content">
                <Appbar pathP={routEnfe.profile} open={open} setopen={setopen}/>
                <main>
                    <RouterE />
                </main>
            </div>
        </div>
    )
}

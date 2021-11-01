import {useState} from 'react';
import RouterAdmin from "routes/admin.router";
import SideBar from "components/Sidebar";
import Appbar from "components/Appbar";
import {routerAdmin} from 'routes/routes';
import {routAdmin} from 'routes/definition';
import useLoaders from 'hooks/loaders';

export default function AdmLayout() {
    const [open, setopen] = useState<boolean>(false);
    useLoaders()
    
    return (
        <div>
            <SideBar items={routerAdmin} open={open}/>
            <div className="main-content">
                <Appbar pathP={routAdmin.profile} open={open} setopen={setopen}/>
                <main>
                    <RouterAdmin />
                </main>
            </div>
        </div>
    )
}

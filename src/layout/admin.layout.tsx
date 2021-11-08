import Box from '@mui/material/Box';
import { useState } from 'react';
import RouterAdmin from "routes/admin.router";
import SideBar from "components/Sidebar";
import Appbar from "components/Appbar";
import { routerAdmin } from 'routes/routes';
import { routAdmin } from 'routes/definition';
import useLoaders from 'hooks/loaders';
import {Segment,Sidebar} from 'semantic-ui-react';
import LoaderCustom from 'components/Loader';
//
export default function AdmLayout() {
    const [open, setopen] = useState<boolean>(false);
    const {loading} = useLoaders()

    return (
        <div>
            <LoaderCustom loading={loading}/>
            <Appbar pathP={routAdmin.profile} open={open} setopen={setopen} />
            <SideBar items={routerAdmin} setopen={setopen} open={open} />
            <Sidebar.Pusher dimmed={open}>
                <Segment basic>
                    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                        <RouterAdmin />
                    </Box>
                </Segment>
            </Sidebar.Pusher>



        </div>
    )
}

/**
 *   <div>
            <SideBar items={routerAdmin} open={open}/>
            <div className="main-content">
                <Appbar pathP={routAdmin.profile} open={open} setopen={setopen}/>
                <main>
                    <RouterAdmin />
                </main>
            </div>
        </div>
 */
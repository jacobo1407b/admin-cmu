import { useState } from 'react';
import Box from '@mui/material/Box';
import RouterE from "routes/enfermero.router";
import SideBar from "components/Sidebar";
import Appbar from "components/Appbar";
import { routerE } from 'routes/routes'
import { routEnfe } from 'routes/definition';
import useInitial from 'hooks/getInitialSol';
import useSocket from 'hooks/useSocket';
import { Segment, Sidebar } from 'semantic-ui-react';
import LoaderCustom from 'components/Loader';

export default function Elayout() {
    const [open, setopen] = useState<boolean>(false);

    const { updateStatus } = useSocket()
    const { loading } = useInitial()
    const routerEnfermero = routerE({ updateStatus })
    return (
        <div>
            <LoaderCustom loading={loading}/>
            <Appbar pathP={routEnfe.profile} open={open} setopen={setopen} />
            <SideBar items={routerEnfermero} setopen={setopen} open={open} />
            <Sidebar.Pusher dimmed={open}>
                <Segment basic>
                    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                        <RouterE updateStatus={updateStatus} />
                    </Box>
                </Segment>
            </Sidebar.Pusher>



        </div>
    )
}

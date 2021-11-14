import { io } from "socket.io-client";
import {urlApi} from 'utils';
import { Alumno, Carrera } from 'types';
import { ALERTA, UPDATE_ALERTA } from './events';
import useAudio from 'hooks/useAudio'
import Swal from 'sweetalert2';
import Logo from 'assets/logo.png';
import {useDispatch} from 'react-redux';
import * as patch from 'redux/dispatch';

const enpoint: string = `ws://${urlApi}`;

interface IUpdateResponse {
    alumno: string,
    causas: string,
    enfermero?: string,
    estado: boolean,
    id_solicitud: string,
    img_enfermero?: string,
    nombre_solicitante: string | null,
    ubicacion: string,
}
/*
interface IAlerta {
    id_alumno: string,
    ubicacion: string,
    causas: string,
    solicitante: boolean,
}*/
interface IResponse {
    alumno: Alumno,
    carrera: Carrera,
    causas: string,
    id_alumno: string,
    solicitante: boolean,
    ubicacion: string,
}
function useSocket() {
    const dispatch = useDispatch()
    const { toggle } = useAudio();
    const socket = io(enpoint);
    
    /*socket.emit(ALERTA, {
        id_alumno: '6184a3dcbc4e2c39d7000008',
        ubicacion: 'Edificio H',
        causas: 'Dolor estomago',
        solicitante: false,
    });*/
    socket.on(ALERTA, async (data: IResponse) => {
        await toggle();
        new Notification(`${data.alumno.nombre} - ${data.causas}`, {
            body: `${data.alumno.nombre} ${data.alumno.a_paterno} ubicado en ${data.ubicacion} requiere asistencia medica`,
            icon: Logo,
            requireInteraction: true,
            silent: false,
            timestamp: Date.now(),
        });
        Swal.fire({
            title: `${data.alumno.nombre} - ${data.causas}`,
            text: `${data.alumno.nombre} ${data.alumno.a_paterno} ubicado en ${data.ubicacion} requiere asistencia medica`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: "OK",
            showConfirmButton: false
        });
    });
    socket.on(UPDATE_ALERTA, (data: IUpdateResponse) => {
        dispatch(patch.setSolicitud(data))
    })

    function updateStatus(id_alerta: string, id_enfermero: string) {
        socket.emit(UPDATE_ALERTA, {
            id_alerta: id_alerta,
            id_enfermero: id_enfermero
        });
    }

    return {updateStatus}
}

export default useSocket

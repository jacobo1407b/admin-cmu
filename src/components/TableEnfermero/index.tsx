import { Header, Button, Table, Icon,Popup } from 'semantic-ui-react';
import CustomAvatar from 'components/CustomAvatar';
import { FunctionComponent } from 'react';
import { SolicitudRealtime,globalState} from 'types';
import {useSelector} from 'react-redux';


interface ITSolicitud {
    solicitudes: SolicitudRealtime[],
    updateStatus:(id_alerta:string,id_enfermero:string)=>void
}
const TableEnfermero: FunctionComponent<ITSolicitud> = ({ solicitudes,updateStatus}) => {
    const user = useSelector((state:globalState) => state.user)

    function emitStatus(id_alerta:string){
        updateStatus(id_alerta,user.id_usuario)
    }
    return (
        <Table basic='very' celled collapsing inverted color="black">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Enfermero</Table.HeaderCell>
                    <Table.HeaderCell>Alumno</Table.HeaderCell>
                    <Table.HeaderCell>Causas</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Ubicacion</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {solicitudes?.map((poste) => (
                    <Table.Row key={poste.id_solicitud}>
                        <Table.Cell>
                            <Header as='h4' image inverted>
                                <CustomAvatar src={poste.img_enfermero} rounded size="mini" />
                                {poste.enfermero_nombre ? (
                                    <Header.Content>
                                        {poste.enfermero_nombre}
                                        <Header.Subheader>{poste.enfermero_apellido}</Header.Subheader>
                                    </Header.Content>
                                ) : (
                                    <Header.Content>
                                        Sin atender
                                    </Header.Content>
                                )}

                            </Header>
                        </Table.Cell>
                        <Table.Cell>{poste.alumno}</Table.Cell>
                        <Table.Cell>{poste.causa}</Table.Cell>
                        {poste.estado ? (
                            <Table.Cell>
                                <Icon name='checkmark' color="green" />
                            </Table.Cell>
                        ) : (
                            <Table.Cell>
                                <Icon name='attention' color="orange" />
                            </Table.Cell>
                        )}
                        <Table.Cell>{poste.ubicacion}</Table.Cell>
                        <Table.Cell>
                        <Popup 
                        content='Marcar como atendido' 
                        trigger={
                            <Button
                            onClick={()=>emitStatus(poste.id_solicitud)}
                             icon 
                             color='green'
                              disabled={poste.estado} 
                              circular
                              >
                                <Icon name='check' />
                            </Button>
                        } 
                        />
                            
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default TableEnfermero

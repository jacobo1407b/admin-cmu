import { FunctionComponent, useState, useEffect } from 'react';
import { Enfermero } from 'types';
import { Header, Table, Button, Icon, Pagination, Popup } from 'semantic-ui-react';
import CustomAvatar from 'components/CustomAvatar';

interface ICTabla {
    headers: string[],
    body?: any,
    type?: "alumno" | "enfermero",
    bodyEnfermero?: Enfermero[],
    onAdd?: any,
    onEdit?: any,
    onPassword?: any,
    onEditMatricula?: any,
    onDelete?: any,
}


const TablaCustom: FunctionComponent<ICTabla> = ({ headers, body, onAdd, onEdit, onPassword, onEditMatricula,onDelete }) => {
    const pageSize: number = 7

    const [arrayAlumnos, setArrayAlumnos] = useState<any>(body);
    var x: number = Number(arrayAlumnos?.length) / pageSize
    const [page, setPage] = useState<number>(1);
    const [pageCont] = useState<number>(Math.ceil(x));

    useEffect(() => {
        const arrayPaginate: any = body?.slice((page - 1) * pageSize, page * pageSize);
        setArrayAlumnos(arrayPaginate)
    }, [body, page]);

    function handlePaginationChange(e: any, { activePage }: any) {
        setPage(activePage);
    }


    return (
        <Table inverted basic='very' color="black" collapsing>
            <Table.Header>
                <Table.Row>
                    {headers.map((header, index) => (
                        <Table.HeaderCell key={index}>
                            {header}
                        </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {arrayAlumnos?.map((row: any, i: number) => (
                    <Table.Row key={row?.id_usuario}>
                        <Table.Cell>
                            <Header as='h4' inverted image>
                                <CustomAvatar src={row?.url} rounded size="mini" />
                                <Header.Content>
                                    {row?.nombre}
                                    <Header.Subheader>{row?.matricula}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{`${row?.a_paterno} ${row?.a_materno}`}</Table.Cell>
                        {row?.abreviatura && <Table.Cell>{row?.abreviatura}</Table.Cell>}
                        <Table.Cell>{row?.correo}</Table.Cell>
                        <Table.Cell>{row?.genero}</Table.Cell>
                        <Table.Cell>
                            <Popup
                                trigger={<Button
                                    icon="cog"
                                    circular
                                    size="mini"
                                    color="blue"
                                    onClick={() => onEdit(row, i)}
                                />}
                                content='Editar información'
                                inverted
                                size='mini'
                            />
                            <Popup
                                trigger={<Button
                                    icon="id card"
                                    circular
                                    size="mini"
                                    color="orange"
                                    onClick={()=>onEditMatricula(row,i)}
                                />}
                                content='Editar matricula'
                                inverted
                                size='mini'
                            />
                            <Popup
                                trigger={<Button
                                    icon="key"
                                    circular
                                    size="mini"
                                    color="green"
                                    onClick={() => onPassword(row, i)}
                                />}
                                content='Editar password'
                                inverted
                                size='mini'
                            />
                            <Popup
                                trigger={<Button 
                                    icon="user delete" 
                                    circular
                                     size="mini" 
                                     color="red"
                                     onClick={() => onDelete(row, i)}
                                      />}
                                content='Eliminar'
                                inverted
                                size='mini'
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>

                    <Table.HeaderCell colSpan='4'>

                        <Pagination
                            onPageChange={handlePaginationChange}
                            activePage={page}
                            boundaryRange={1}
                            size='mini'
                            siblingRange={2}
                            totalPages={pageCont}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            color="orange"
                            size='small'
                            circular
                            onClick={onAdd}
                        >
                            <Icon name='user' /> Agregar
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default TablaCustom

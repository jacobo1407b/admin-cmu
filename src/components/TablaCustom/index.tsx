import { FunctionComponent, useState, useEffect } from 'react';
import { Alumno, Enfermero } from 'types';
import { Header, Table, Button, Icon, Pagination } from 'semantic-ui-react';
import CustomAvatar from 'components/CustomAvatar';

interface ICTabla {
    headers: string[],
    body?: Alumno[] | null,
    type?: "alumno" | "enfermero",
    bodyEnfermero?: Enfermero[],
}
const TablaCustom: FunctionComponent<ICTabla> = ({ headers, body, type, bodyEnfermero }) => {
    const pageSize: number = 7

    const [arrayAlumnos, setArrayAlumnos] = useState<Alumno[] | null | undefined>(body);
    var x:number = Number(arrayAlumnos?.length) / pageSize
    const [page, setPage] = useState<number>(1);
    const [pageCont] = useState<number>(Math.ceil(x));

    useEffect(() => {
        const arrayPaginate: Alumno[] | undefined = body?.slice((page - 1) * pageSize, page * pageSize);
        setArrayAlumnos(arrayPaginate)
    }, [body, page]);

    function handlePaginationChange(e: any, {activePage}: any) {
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
                {arrayAlumnos?.map((row) => (
                    <Table.Row key={row?.id_usuario}>
                        <Table.Cell>
                            <Header as='h4' inverted image>
                                <CustomAvatar src={row.url} rounded size="mini" />
                                <Header.Content>
                                    {row.nombre}
                                    <Header.Subheader>{row.matricula}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>{`${row.a_paterno} ${row.a_materno}`}</Table.Cell>
                        <Table.Cell>{row.abreviatura}</Table.Cell>
                        <Table.Cell>{row.correo}</Table.Cell>
                        <Table.Cell>{row.genero}</Table.Cell>
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

import PropTypes from 'prop-types';
import {
    Box,
    Card,
    IconButton,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { SeverityPill } from '../../../../components';
import { EditOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const UserTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        onEdit,
        onDelete,
        onViewCarrers,
    } = props;

    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.permisions : [];
    };
    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Correo
                                </TableCell>
                                <TableCell>
                                    Rol
                                </TableCell>
                                <TableCell>
                                    Tipo de usuario
                                </TableCell>
                                <TableCell>
                                    Carreras
                                </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                <TableCell>
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((user) => {
                                return (
                                    <TableRow
                                        hover
                                        key={user.id}
                                    >
                                        <TableCell>
                                            {user.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {user.rol.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.type_user.name}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => onViewCarrers(user.careerIds)}
                                            >
                                                <RemoveRedEyeOutlined color="info" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={user.state ? 'success' : 'error'}>
                                                {user.state ? 'Activo' : 'Inactivo'}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    onClick={() => onEdit(user)}
                                                    disabled={permisions().filter((e) => e.name === 'Editar usuarios').length == 0}
                                                >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <Switch
                                                    checked={user.state}
                                                    onChange={(event) => onDelete({ id: user.id, state: event.target.checked })}
                                                    color="success"
                                                    size="small"
                                                    disabled={permisions().filter((e) => e.name === 'Eliminar usuarios').length == 0}
                                                />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

UserTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
};

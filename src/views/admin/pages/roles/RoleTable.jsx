import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
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
import { useSelectorStore } from '../../../../hooks';
import { SeverityPill } from '../../../../components';
import { EditOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const RoleTable = (props) => {
    const {
        stateSelect = false,
        stateMultiple = true,
        allItems = [],
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        onEdit,
        onDelete,
        onViewPermisions,
        itemSelect
    } = props;

    const { selection = [] } = useSelector((state) => state.selections);

    const { selectAll, selectOne, deselectAll, deselectOne } = useSelectorStore();
    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.permisions : [];
    };
    return (
        <Card>
            <TableContainer>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table aria-label="a dense table">

                        <TableHead>
                            <TableRow>
                                {
                                    stateSelect
                                    && <TableCell padding="checkbox">
                                        {stateMultiple && <Checkbox
                                            checked={allItems.map(e => e.id).every(id => selection.includes(id))}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    selectAll?.(allItems.map(e => e.id));
                                                } else {
                                                    deselectAll?.(allItems.map(e => e.id));
                                                }
                                            }}
                                        />}
                                    </TableCell>
                                }
                                <TableCell>
                                    Nombre
                                </TableCell>
                                {
                                    !stateSelect && <TableCell>
                                        Permisos
                                    </TableCell>
                                }
                                {
                                    !stateSelect &&
                                    <TableCell>
                                        Estado
                                    </TableCell>
                                }
                                {
                                    !stateSelect && <TableCell>
                                        Acciones
                                    </TableCell>
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((rol) => {
                                const isSelected = selected.includes(rol.id);
                                return (
                                    <TableRow
                                        hover
                                        key={rol.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        if (stateMultiple) {
                                                            if (value.target.checked) {
                                                                selectOne?.(rol.id);
                                                            } else {
                                                                deselectOne?.(rol.id);
                                                            }
                                                        } else {
                                                            itemSelect(rol)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {rol.name}
                                        </TableCell>
                                        {
                                            !stateSelect && <TableCell>
                                                <IconButton
                                                    onClick={() => onViewPermisions(rol.permisionIds)}
                                                >
                                                    <RemoveRedEyeOutlined color="info" />
                                                </IconButton>
                                            </TableCell>
                                        }
                                        {
                                            !stateSelect && <TableCell>
                                                <SeverityPill color={rol.state ? 'success' : 'error'}>
                                                    {rol.state ? 'Activo' : 'Inactivo'}
                                                </SeverityPill>
                                            </TableCell>
                                        }
                                        {
                                            !stateSelect && <TableCell>
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <IconButton
                                                        onClick={() => onEdit(rol)}
                                                        disabled={permisions().filter((e) => e.name === 'Editar roles').length == 0}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <Switch
                                                        checked={rol.state}
                                                        onChange={(event) => onDelete({ ...rol, state: event.target.checked })}
                                                        color="success"
                                                        size="small"
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar roles').length == 0}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        }


                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <TablePagination
                component="div"
                count={allItems.length}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

RoleTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
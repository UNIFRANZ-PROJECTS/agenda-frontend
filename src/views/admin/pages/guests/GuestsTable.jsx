import PropTypes from 'prop-types';
import {
    Avatar,
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
import { EditOutlined } from '@mui/icons-material';
import React from 'react';
import { getInitials } from '../../../../utils/getInitials';
import { useSelector } from 'react-redux';

export const GuestsTable = React.memo((props) => {
    const {
        stateEdit = true,
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
                                <TableCell>
                                    Apellido
                                </TableCell>
                                <TableCell>
                                    Imagen
                                </TableCell>
                                <TableCell>
                                    Especialidad
                                </TableCell>
                                <TableCell>
                                    Descripción
                                </TableCell>
                                {
                                    stateEdit && <TableCell>
                                        Estado
                                    </TableCell>
                                }
                                {
                                    stateEdit && <TableCell>
                                        Acciones
                                    </TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((guest) => {
                                const isSelected = selected.includes(guest.id);
                                return (
                                    <TableRow
                                        hover
                                        key={guest.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        console.log(`holaa seleccionando un expositor ${guest}`)
                                                        if (stateMultiple) {
                                                            if (value.target.checked) {
                                                                selectOne?.(guest.id);
                                                            } else {
                                                                deselectOne?.(guest.id);
                                                            }
                                                        } else {
                                                            itemSelect(guest)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {guest.first_name}
                                        </TableCell>
                                        <TableCell>
                                            {guest.last_name}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src={guest.image}>
                                                    {getInitials(guest.title)}
                                                </Avatar>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {guest.specialty}
                                        </TableCell>
                                        <TableCell>
                                            {guest.description}
                                        </TableCell>
                                        {
                                            stateEdit && <TableCell>
                                                <SeverityPill color={guest.state ? 'success' : 'error'}>
                                                    {guest.state ? 'Activo' : 'Inactivo'}
                                                </SeverityPill>
                                            </TableCell>
                                        }
                                        {
                                            stateEdit && <TableCell>
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <IconButton
                                                        onClick={() => onEdit(guest)}
                                                        disabled={permisions().filter((e) => e.name === 'Editar expositores').length == 0}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <Switch
                                                        checked={guest.state}
                                                        onChange={(event) => onDelete({ ...guest, state: event.target.checked })}
                                                        color="success"
                                                        size="small"
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar expositores').length == 0}
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
});

GuestsTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
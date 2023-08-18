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
import { EditOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import React from 'react';
import { format } from 'date-fns';
import { getInitials } from '../../../../utils/getInitials';
import { useSelector } from 'react-redux';

export const EventsTable = React.memo((props) => {
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
        itemSelect,
        onViewCarrers,
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
                                    Titulo
                                </TableCell>
                                <TableCell>
                                    Descripción
                                </TableCell>
                                <TableCell>
                                    Imagen
                                </TableCell>
                                <TableCell>
                                    Carreras
                                </TableCell>
                                <TableCell>
                                    Incio
                                </TableCell>
                                <TableCell>
                                    Fin
                                </TableCell>
                                <TableCell>
                                    Modalidad
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
                            {items.map((eventItem) => {
                                const isSelected = selected.includes(eventItem.id);
                                const start = format(new Date(eventItem.start), 'dd/MM/yyyy HH:mm');
                                const end = format(new Date(eventItem.end), 'dd/MM/yyyy HH:mm');
                                return (
                                    <TableRow
                                        hover
                                        key={eventItem.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        if (stateMultiple) {
                                                            if (value.target.checked) {
                                                                selectOne?.(value.id);
                                                            } else {
                                                                deselectOne?.(value.id);
                                                            }
                                                        } else {
                                                            itemSelect(eventItem)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {eventItem.title}
                                        </TableCell>
                                        <TableCell>
                                            {eventItem.description}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src={eventItem.image}>
                                                    {getInitials(eventItem.title)}
                                                </Avatar>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => onViewCarrers(eventItem.careerIds)}
                                            >
                                                <RemoveRedEyeOutlined color="info" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            {start}
                                        </TableCell>
                                        <TableCell>
                                            {end}
                                        </TableCell>
                                        <TableCell>
                                            {eventItem.modality}
                                        </TableCell>
                                        {
                                            stateEdit && <TableCell>
                                                <SeverityPill color={eventItem.state ? 'success' : 'error'}>
                                                    {eventItem.state ? 'Activo' : 'Inactivo'}
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
                                                        onClick={() => onEdit(eventItem)}
                                                        disabled={permisions().filter((e) => e.name === 'Editar eventos').length == 0}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <Switch
                                                        checked={eventItem.state}
                                                        onChange={(event) => onDelete({ id: eventItem.id, state: event.target.checked })}
                                                        color="success"
                                                        size="small"
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar eventos').length == 0}

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

EventsTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
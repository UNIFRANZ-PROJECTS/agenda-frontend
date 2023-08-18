import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useSelectorStore } from '../../../../hooks';
import React from 'react';
import { useSelector } from 'react-redux';

export const StudentsTable = React.memo((props) => {
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
        itemSelect
    } = props;

    const { selection = [] } = useSelector((state) => state.selections);

    const { selectAll, selectOne, deselectAll, deselectOne } = useSelectorStore();

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
                                    Código
                                </TableCell>
                                <TableCell>
                                    CI
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Apellido
                                </TableCell>
                                <TableCell>
                                    Correo
                                </TableCell>
                                <TableCell>
                                    Sede
                                </TableCell>
                                <TableCell>
                                    Carrera
                                </TableCell>
                                <TableCell>
                                    Semestre
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((student) => {
                                const isSelected = selected.includes(student.id);
                                return (
                                    <TableRow
                                        hover
                                        key={student.id}
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
                                                            itemSelect(student)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {student.codigo}
                                        </TableCell>
                                        <TableCell>
                                            {student.ci}
                                        </TableCell>
                                        <TableCell>
                                            {student.nombre}
                                        </TableCell>
                                        <TableCell>
                                            {student.apellido}
                                        </TableCell>
                                        <TableCell>
                                            {student.email}
                                        </TableCell>
                                        <TableCell>
                                            {student.sede}
                                        </TableCell>
                                        <TableCell>
                                            {student.carrera}
                                        </TableCell>
                                        <TableCell>
                                            {student.sede}
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

StudentsTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
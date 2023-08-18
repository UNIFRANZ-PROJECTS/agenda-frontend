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
import { useSelector } from 'react-redux';

export const CarrerTable = (props) => {
    const {
        allItems = [],
        items = [],
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
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
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={allItems.map(e => e.id).every(id => selection.includes(id))}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                selectAll?.(allItems.map(e => e.id));
                                            } else {
                                                deselectAll?.(allItems.map(e => e.id));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Abreviatura
                                </TableCell>
                                <TableCell>
                                    Sede
                                </TableCell>
                                <TableCell>
                                    Facultad
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((carrer) => {
                                const isSelected = selected.includes(carrer.id);
                                return (
                                    <TableRow
                                        hover
                                        key={carrer.id}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        selectOne?.(carrer.id);
                                                    } else {
                                                        deselectOne?.(carrer.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {carrer.name}
                                        </TableCell>
                                        <TableCell>
                                            {carrer.abbreviation}
                                        </TableCell>
                                        <TableCell>
                                            {carrer.campus}
                                        </TableCell>
                                        <TableCell>
                                            {carrer.faculty}
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
};

CarrerTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
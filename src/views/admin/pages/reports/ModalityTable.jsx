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

export const ModalitiesTable = (props) => {
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
                                        checked={allItems.map(e => e.name).every(name => selection.includes(name))}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                selectAll?.(allItems.map(e => e.name));
                                            } else {
                                                deselectAll?.(allItems.map(e => e.name));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Modalidad
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((modality) => {
                                const isSelected = selected.includes(modality.name);
                                return (
                                    <TableRow
                                        hover
                                        key={modality.id}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        selectOne?.(modality.name);
                                                    } else {
                                                        deselectOne?.(modality.name);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {modality.name}
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

ModalitiesTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
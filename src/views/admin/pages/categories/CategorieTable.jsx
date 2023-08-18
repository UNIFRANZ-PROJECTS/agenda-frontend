
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
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';

export const CategorieTable = React.memo((props) => {
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
                                    Icono
                                </TableCell>
                                {
                                    !stateSelect && <TableCell>
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
                            {items.map((categorie) => {
                                const isSelected = selected.includes(categorie.id);
                                return (
                                    <TableRow
                                        hover
                                        key={categorie.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        console.log(`holaa seleccionando una categoria ${categorie}`)
                                                        if (stateMultiple) {
                                                            if (value.target.checked) {
                                                                selectOne?.(categorie.id);
                                                            } else {
                                                                deselectOne?.(categorie.id);
                                                            }
                                                        } else {
                                                            itemSelect(categorie)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>
                                            {categorie.title}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <div
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                    }}
                                                >
                                                    <ReactSVG
                                                        src={categorie.icon}
                                                        beforeInjection={(svg) => {
                                                            svg.setAttribute('fill', 'black');
                                                            svg.setAttribute('width', '100%');
                                                            svg.setAttribute('height', '100%');
                                                        }}
                                                    />
                                                </div>
                                            </Stack>
                                        </TableCell>
                                        {
                                            !stateSelect && <TableCell>
                                                <SeverityPill color={categorie.state ? 'success' : 'error'}>
                                                    {categorie.state ? 'Activo' : 'Inactivo'}
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
                                                        onClick={() => onEdit(categorie)}
                                                        disabled={permisions().filter((e) => e.name === 'Editar categorias').length == 0}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <Switch
                                                        checked={categorie.state}
                                                        onChange={(event) => onDelete({ ...categorie, state: event.target.checked })}
                                                        color="success"
                                                        size="small"
                                                        disabled={permisions().filter((e) => e.name === 'Eliminar categorias').length == 0}
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

CategorieTable.propTypes = {
    allItems: PropTypes.array,
    items: PropTypes.array,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
import { Button, Drawer, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { applyPagination } from "../utils/ApplyPagination";

export const ComponentDraw = React.memo(({
    stateEdit, stateSelect, stateMultiple, title, list = [], opendrawer, handleDrawer, itemSelect, children }) => {
    //controladores de seleccion
    const { selection = [] } = useSelector((state) => state.selections);
    // Obtener la lista paginada de permisos utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [itemsList, setItemsList] = useState([]);

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);


    //nueva lista de permisos por paginacion
    useEffect(() => {
        const defaultList = applyPagination(
            list,
            page,
            rowsPerPage
        );
        setItemsList(defaultList);
    }, [list, page, rowsPerPage]);

    return (
        <Drawer
            PaperProps={{
                style: {
                    maxHeight: '75vh',
                    top: 'auto',
                    bottom: 0,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr',
                },
            }}
            anchor="bottom"
            open={opendrawer}
            onClose={() => handleDrawer(false)}
            style={{ zIndex: 9999 }}
        >
            <div style={{ overflowY: 'auto' }}>
                <div style={{ padding: '8px', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                    <Typography variant="h6">{title}</Typography>
                </div>
                <div style={{ padding: '16px' }}>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, {
                            stateEdit: stateEdit,
                            stateSelect: stateSelect,
                            stateMultiple: stateMultiple,
                            allItems: list,
                            items: itemsList,
                            onPageChange: handlePageChange,
                            onRowsPerPageChange: handleRowsPerPageChange,
                            page: page,
                            rowsPerPage: rowsPerPage,
                            selected: selection,
                            itemSelect: itemSelect,
                        });
                    })}
                </div>
                <div style={{ padding: '3px', position: 'sticky', bottom: 0, background: '#fff' }}>
                    <Grid container sx={{ justifyContent: 'space-evenly' }}>
                        <Button onClick={() => handleDrawer(false)}>Cancelar</Button>
                        {
                            stateMultiple ?
                                <Button onClick={() => handleDrawer(false)}>Seleccionar</Button> : <></>
                        }
                    </Grid>
                </div>
            </div>
        </Drawer>
    )
});

import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { ComponentInput } from "../../../../components";
import { usePermisionStore } from "../../../../hooks";
import { PermisionTable } from "./";

export const PermisionsView = () => {
    const { getPermisions } = usePermisionStore();

    // Obtener la lista de typeUsers del estado global usando useSelector
    const { permisions = [] } = useSelector((state) => state.users);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getPermisions();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [permisionList, setTypeUserList] = useState([]);

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);

    // Definir el estado y el callback para la búsqueda
    const [search, setSearch] = useState("");
    const onInputChange = useCallback(({ target }) => {
        setSearch(target.value.trim());
        setPage(0);
    }, []);

    // Actualizar la lista de typeUsers cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        if (search && search.trim() !== "") {
            const filteredPermisions = permisions.filter((e) =>
                e.name.includes(search.trim())
            );
            const updatedPermisionsList = applyPagination(
                filteredPermisions,
                page,
                rowsPerPage
            );
            setTypeUserList(updatedPermisionsList);
        } else {
            const defaultPermisionsList = applyPagination(
                permisions,
                page,
                rowsPerPage
            );
            setTypeUserList(defaultPermisionsList);
        }
    }, [permisions, page, rowsPerPage, search]);


    return (
        <Box component="main">
            <Container maxWidth="xl">
                <Stack spacing={1}>
                    {/* Renderizar el encabezado */}
                    <Stack direction="row" justifyContent="space-between">
                        <Stack spacing={1}>
                            <Typography variant="h5">Permisos</Typography>
                        </Stack>
                    </Stack>
                    {/* Renderizar el campo de búsqueda */}
                    <ComponentInput
                        type="text"
                        label="Buscar permiso"
                        name="search"
                        value={search}
                        onChange={onInputChange}
                    />
                    {/* Renderizar la tabla de tipos de usuario */}
                    <PermisionTable
                        allItems={permisions}
                        items={permisionList}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </Stack>
            </Container>
        </Box>
    );
};

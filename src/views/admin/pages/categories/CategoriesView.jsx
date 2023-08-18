import React, { useCallback, useEffect, useState } from "react";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Add } from "@mui/icons-material";
import { CategorieTable, CreateCategorie } from "./";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { useCategorieStore } from "../../../../hooks";
import { ComponentInput } from "../../../../components";

export const CategoriesView = () => {
    // Acceder a las funciones getTypeUser y putTypeUser desde el custom hook useTypeUserStore
    const { getCategorie, putCategorie } = useCategorieStore();

    // Obtener la lista de typeUsers del estado global usando useSelector
    const { categories = [] } = useSelector((state) => state.events);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getCategorie();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categorieList, setCategorieList] = useState([])

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);

    // Definir los estados para el diálogo de edición y el tipo de usuario a editar
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    // Definir los callbacks para abrir y cerrar el diálogo de edición
    const handleDialog = useCallback((value) => {
        setItemEdit({});
        setopenDialog(value);
    }, []);

    // Definir el callback para editar un tipo de usuario
    const handleEdit = useCallback((item) => {
        setopenDialog(true);
        setItemEdit(item);
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
            const filteredTypeUsers = categories.filter((e) =>
                e.title.includes(search.trim())
            );
            const updatedCategorieList = applyPagination(
                filteredTypeUsers,
                page,
                rowsPerPage
            );
            setCategorieList(updatedCategorieList);
        } else {
            const defaultCategorieList = applyPagination(
                categories,
                page,
                rowsPerPage
            );
            setCategorieList(defaultCategorieList);
        }
    }, [categories, page, rowsPerPage, search]);

    const { data } = useSelector((state) => state.auth);
    const permisions = () => {
        return data ? data.permisions : [];
    };
    return (
        <>
            {/* Renderizar el componente principal */}
            <Box component="main">
                <Container maxWidth="xl">
                    <Stack spacing={1}>
                        {/* Renderizar el encabezado */}
                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography variant="h5">Categorias</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                    disabled={permisions().filter((e) => e.name === 'Crear categorias').length == 0}
                                >
                                    Nuevo categoria
                                </Button>
                            </div>
                        </Stack>
                        {/* Renderizar el campo de búsqueda */}
                        <ComponentInput
                            id="serchCategorie"
                            type="text"
                            label="Buscar categoria"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        {/* Renderizar la tabla de tipos de usuario */}
                        <CategorieTable
                            allItems={categories}
                            items={categorieList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onEdit={handleEdit}
                            onDelete={putCategorie}
                        />
                    </Stack>
                </Container>
            </Box>
            {/* Renderizar el diálogo de creación/edición de tipo de usuario */}
            <CreateCategorie
                open={openDialog}
                handleClose={() => handleDialog(false)}
                item={itemEdit}
            />
        </>
    );
};

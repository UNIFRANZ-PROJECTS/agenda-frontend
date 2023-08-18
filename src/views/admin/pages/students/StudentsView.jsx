import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { StudentsTable } from "./";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { useStudentStore } from "../../../../hooks";
import { ComponentDate, ComponentInput } from "../../../../components";

export const StudentsView = () => {
    const { getStudents } = useStudentStore();

    const { students = [] } = useSelector((state) => state.students);

    useEffect(() => {
        getStudents();
    }, []);

    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [eventList, setEventList] = useState([])

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
            const filteredEvent = students.filter((e) =>
                e.codigo.includes(search.trim())
            );
            const updatedEventList = applyPagination(
                filteredEvent,
                page,
                rowsPerPage
            );
            setEventList(updatedEventList);
        } else {
            const defaultEventList = applyPagination(
                students,
                page,
                rowsPerPage
            );
            setEventList(defaultEventList);
        }
    }, [students, page, rowsPerPage, search]);


    return (
        <>

            {/* Renderizar el componente principal */}
            <Box component="main">
                <Container maxWidth="xl">
                    <Stack spacing={1}>
                        {/* Renderizar el encabezado */}
                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography variant="h5">Estudiantes</Typography>
                            </Stack>
                        </Stack>

                        {/* Renderizar el campo de búsqueda */}
                        <ComponentInput
                            type="text"
                            label="Buscar estudiante"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        {/* Renderizar la tabla de tipos de usuario */}
                        <StudentsTable
                            allItems={students}
                            items={eventList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

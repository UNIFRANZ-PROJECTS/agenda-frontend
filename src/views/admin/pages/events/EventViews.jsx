import React, { useCallback, useEffect, useState } from "react";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Add } from "@mui/icons-material";
import { CreateEvent, EventsTable } from "./";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { useCarrerStore, useCategorieStore, useEventStore, useGuestStore, useSelectorStore } from "../../../../hooks";
import { ComponentDate, ComponentInput } from "../../../../components";
import { ShowCarrers } from "../users";

export const EventViews = () => {
    // Acceder a las funciones getTypeUser y putTypeUser desde el custom hook useTypeUserStore

    const { selectAll, clearSelect } = useSelectorStore();
    const { getEventAdmin, putEvent } = useEventStore();
    const { getGuest } = useGuestStore();
    const { getCategorie } = useCategorieStore();
    const { getCarrers } = useCarrerStore();


    // Obtener la lista de typeUsers del estado global usando useSelector
    const { events = [] } = useSelector((state) => state.events);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getEventAdmin();
        getGuest();
        getCategorie();
        getCarrers();
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

    // Definir los estados para el diálogo de edición y el tipo de usuario a editar
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    // Definir los callbacks para abrir y cerrar el diálogo de edición
    const handleDialog = useCallback((value) => {
        clearSelect();
        setItemEdit({});
        setopenDialog(value);
    }, []);

    // Definir el callback para editar un tipo de usuario
    const handleEdit = useCallback((item) => {
        clearSelect();
        selectAll(item.categoryIds.map((e) => e.id));
        selectAll(item.careerIds.map((e) => e.id));
        selectAll(item.guestIds.map((e) => e.id));
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
            const filteredEvent = events.filter((e) =>
                e.title.includes(search.trim())
            );
            const updatedEventList = applyPagination(
                filteredEvent,
                page,
                rowsPerPage
            );
            setEventList(updatedEventList);
        } else {
            const defaultEventList = applyPagination(
                events,
                page,
                rowsPerPage
            );
            setEventList(defaultEventList);
        }
    }, [events, page, rowsPerPage, search]);
    const [opendrawer, setOpendrawer] = useState({ state: false, items: [] });
    const handleCarrers = useCallback((state, items) => {
        setOpendrawer({ state, items })
    }, [],
    )
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
                                <Typography variant="h5">Eventos</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                    disabled={permisions().filter((e) => e.name === 'Crear eventos').length == 0}
                                >
                                    Nuevo evento
                                </Button>
                            </div>
                        </Stack>

                        {/* Renderizar el campo de búsqueda */}
                        <ComponentInput
                            type="text"
                            label="Buscar evento"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        {/* Renderizar la tabla de tipos de usuario */}
                        <EventsTable
                            allItems={events}
                            items={eventList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onEdit={handleEdit}
                            onDelete={putEvent}
                            onViewCarrers={(items) => handleCarrers(true, items)}
                        />
                    </Stack>
                </Container>
            </Box>
            {/* Renderizar el diálogo de creación/edición de tipo de usuario */}
            <CreateEvent
                open={openDialog}
                handleClose={() => handleDialog(false)}
                item={itemEdit}
            />
            <ShowCarrers
                open={opendrawer.state}
                handleClose={() => handleCarrers(false, [])}
                items={opendrawer.items}
            />
        </>
    );
};

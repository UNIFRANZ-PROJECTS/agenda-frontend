import React, { useCallback, useEffect, useState } from "react";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Add } from "@mui/icons-material";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { CreateRole, RoleTable, ShowPermisions } from "./";
import { usePermisionStore, useRoleStore, useSelectorStore } from "../../../../hooks";
import { ComponentInput } from "../../../../components";


export const RolesView = () => {
    // Acceder a las funciones getRole y putRole desde el custom hook useRoleStore
    const { selectAll, clearSelect } = useSelectorStore();
    const { getRole, putRole } = useRoleStore();
    const { getPermisions } = usePermisionStore();

    // Obtener la lista de roles del estado global usando useSelector
    const { roles = [] } = useSelector((state) => state.users);
    // Obtener los tipos de usuarios
    useEffect(() => {
        getRole();
        getPermisions();
    }, []);
    // Obtener la lista paginada de typroleseUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [roleList, setRoleList] = useState([]);

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
        selectAll(item.permisionIds.map(e => e.id));
        setopenDialog(true);
        setItemEdit(item);
    }, []);

    // Definir el estado y el callback para la búsqueda
    const [search, setSearch] = useState("");
    const onInputChange = useCallback(({ target }) => {
        setSearch(target.value.trim());
        setPage(0);
    }, []);

    // Actualizar la lista de roles cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        if (search && search.trim() !== "") {
            const filteredRoles = roles.filter((e) =>
                e.name.includes(search.trim())
            );
            const updatedRoleList = applyPagination(
                filteredRoles,
                page,
                rowsPerPage
            );
            setRoleList(updatedRoleList);
        } else {
            const defaultRoleList = applyPagination(
                roles,
                page,
                rowsPerPage
            );
            setRoleList(defaultRoleList);
        }
    }, [roles, page, rowsPerPage, search]);


    const [opendrawer, setOpendrawer] = useState({ state: false, items: [] });
    const handlePermisions = useCallback((state, items) => {
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
                                <Typography variant="h5">Roles</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => handleDialog(true)}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                    disabled={permisions().filter((e) => e.name === 'Crear roles').length == 0}
                                >
                                    Nuevo Rol
                                </Button>
                            </div>
                        </Stack>
                        {/* Renderizar el campo de búsqueda */}
                        <ComponentInput
                            type="text"
                            label="Buscar tipo de usuario"
                            name="search"
                            value={search}
                            onChange={onInputChange}
                        />
                        {/* Renderizar la tabla de tipos de usuario */}
                        <RoleTable
                            allItems={roles}
                            items={roleList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onEdit={handleEdit}
                            onDelete={(item) => putRole({
                                ...item,
                                permisionIds: item.permisionIds.map((e) => e.id)
                            })}
                            onViewPermisions={(items) => handlePermisions(true, items)}
                        />
                    </Stack>
                </Container>
            </Box>
            <CreateRole
                open={openDialog}
                handleClose={() => handleDialog(false)}
                item={itemEdit}
            />
            <ShowPermisions
                open={opendrawer.state}
                handleClose={() => handlePermisions(false, [])}
                items={opendrawer.items}
            />
        </>
    );
};


import React, { useCallback, useEffect, useState } from "react";
import { Button, Chip, Grid, SvgIcon, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { useSelector } from "react-redux";
import { useCarrerStore, useCategorieStore, useReportStore } from "../../../../hooks";
import { CarrerTable, ShowCarrers } from "../users";
import { EventsTable } from "../events/EventsTable";
import { ComponentDraw, ComponentSelect } from "../../../../components";
import { CategorieTable } from "../categories/CategorieTable";
import { CampusTable } from "./CampusTable";
import { ModalitiesTable } from "./ModalityTable";
import { ComponentDateRange } from "../../../../components/DateRange";
import { Add } from "@mui/icons-material";

export const ReportsView = () => {

    const { getReport, getReportDocument } = useReportStore();
    const { getCategorie } = useCategorieStore();
    const { getCarrers } = useCarrerStore();


    const { reports = [] } = useSelector((state) => state.reports);
    const { selection = [] } = useSelector((state) => state.selections);

    useEffect(() => {
        getReport({});
        getCategorie();
        getCarrers();
    }, []);
    // Obtener la lista paginada de typeUsers utilizando el hook useMemo
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reportList, setReportList] = useState([])

    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChange = useCallback((_, value) => {
        setPage(value);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
    }, []);


    // Actualizar la lista de typeUsers cuando cambie la búsqueda, la página o las filas por página
    useEffect(() => {
        const defaultEventList = applyPagination(
            reports,
            page,
            rowsPerPage
        );
        setReportList(defaultEventList);
    }, [reports, page, rowsPerPage]);

    const [opendrawer, setOpendrawer] = useState({ state: false, items: [] });
    const handleCarrers = useCallback((state, items) => {
        setOpendrawer({ state, items })
    }, [],
    )

    const { sedes = [], modalities = [], carrers = [] } = useSelector((state) => state.users);
    //sede
    const [opendrawerCampus, setOpenDrawerCampus] = useState(false);
    const handleDrawerCampus = useCallback((value) => {
        setOpenDrawerCampus(value);
    }, []);
    //carrera
    const [campusSearch, setCampusSearch] = useState('')
    const [opendrawerCarrer, setOpenDrawerCarrer] = useState(false);
    const handleDrawerCarrer = useCallback((value) => {
        setOpenDrawerCarrer(value);
        if (!value) {
            setFilter()
        }
    }, [selection]);
    //modalidad
    const [opendrawerModality, setOpenDrawerModality] = useState(false);
    const handleDrawerModality = useCallback((value) => {
        setOpenDrawerModality(value);
        if (!value) {
            setFilter()
        }
    }, [selection]);
    //categoria
    const { categories = [] } = useSelector((state) => state.events);

    const [opendrawerCategorie, setOpenDrawerCategorie] = useState(false);
    const handleDrawerCategorie = useCallback((value) => {
        setOpenDrawerCategorie(value);
        if (!value) {
            setFilter()
        }
    }, [selection]);

    //calendar range
    const [dateRange, onChangeDateRange] = useState([]);
    useEffect(() => {
        if (dateRange.length > 0) {
            setFilter()
        }
    }, [dateRange])

    const setFilter = () => {
        let dataCarrers = null;
        let dataCategories = null;
        let dataModalities = null;
        let start = dateRange.length > 0 ? dateRange[0] : null;
        let end = dateRange.length > 0 ? dateRange[1] : null;
        if ([...carrers.filter(e => selection.includes(e.id))].length > 0) {
            dataCarrers = [...carrers.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...categories.filter(e => selection.includes(e.id))].length > 0) {
            dataCategories = [...categories.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...modalities.filter(e => selection.includes(e.name))].length > 0) {
            dataModalities = [...modalities.filter(e => selection.includes(e.name))].map(e => e.name)
        }
        getReport(
            {
                carrers: dataCarrers,
                categories: dataCategories,
                modality: dataModalities,
                start: start,
                end: end,
            }
        );
    }
    const getDocument = () => {
        let dataCarrers = null;
        let dataCategories = null;
        let dataModalities = null;
        let start = dateRange.length > 0 ? dateRange[0] : null;
        let end = dateRange.length > 0 ? dateRange[1] : null;
        if ([...carrers.filter(e => selection.includes(e.id))].length > 0) {
            dataCarrers = [...carrers.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...categories.filter(e => selection.includes(e.id))].length > 0) {
            dataCategories = [...categories.filter(e => selection.includes(e.id))].map(e => e.id)
        }
        if ([...modalities.filter(e => selection.includes(e.name))].length > 0) {
            dataModalities = [...modalities.filter(e => selection.includes(e.name))].map(e => e.name)
        }
        getReportDocument(
            {
                carrers: dataCarrers,
                categories: dataCategories,
                modality: dataModalities,
                start: start,
                end: end,
            })
    }

    return (
        <>
            {
                opendrawerCampus &&
                <ComponentDraw
                    stateEdit={false}
                    stateSelect={true}
                    stateMultiple={true}
                    title='Sedes'
                    list={sedes}
                    opendrawer={opendrawerCampus}
                    handleDrawer={handleDrawerCampus}
                >
                    <CampusTable />
                </ComponentDraw>
                // <></>
            }
            {
                opendrawerCarrer &&
                <ComponentDraw
                    stateEdit={false}
                    stateSelect={true}
                    stateMultiple={true}
                    title={`Carreras de ${campusSearch} `}
                    list={[...carrers.filter((e) => e.campus == campusSearch)]}
                    opendrawer={opendrawerCarrer}
                    handleDrawer={handleDrawerCarrer}
                >
                    <CarrerTable />
                </ComponentDraw>
            }
            {
                opendrawerModality &&
                <ComponentDraw
                    stateEdit={false}
                    stateSelect={true}
                    stateMultiple={true}
                    title='Modalidades'
                    list={modalities}
                    opendrawer={opendrawerModality}
                    handleDrawer={handleDrawerModality}
                >
                    <ModalitiesTable />
                </ComponentDraw>
            }
            {
                opendrawerCategorie &&
                <ComponentDraw
                    stateEdit={false}
                    stateSelect={true}
                    stateMultiple={true}
                    title='Categorias'
                    list={categories}
                    opendrawer={opendrawerCategorie}
                    handleDrawer={handleDrawerCategorie}
                >

                    <CategorieTable />
                </ComponentDraw>
            }
            <Box component="main">
                <Container maxWidth="xl">
                    <Stack spacing={1}>

                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography variant="h5">Reportes</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => { getDocument() }}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                >
                                    Descargar
                                </Button>
                            </div>
                        </Stack>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={2} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    items={sedes}
                                    title="Sedes"
                                    onPressed={() => handleDrawerCampus(true)}
                                    select='name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['title']}
                                    items={categories}
                                    title="Categorias"
                                    onPressed={() => handleDrawerCategorie(true)} />
                            </Grid>
                            <Grid item xs={12} sm={2} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    items={modalities}
                                    title="Modalidades"
                                    onPressed={() => handleDrawerModality(true)}
                                    select='name' />
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                <ComponentDateRange
                                    value={dateRange}
                                    onChange={onChangeDateRange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center">
                            {
                                [...sedes.filter(e => selection.includes(e.name))].map((data) => {
                                    return (
                                        <Grid key={data.id} item xs={12} sm={12 / [...sedes.filter(e => selection.includes(e.name))].length} sx={{ padding: '5px' }}>
                                            <ComponentSelect
                                                labelChip={['abbreviation']}
                                                items={[...carrers.filter((e) => e.campus === data.name)]}
                                                title={`Carreras de ${data.name}`}
                                                onPressed={() => {
                                                    setCampusSearch(data.name)
                                                    handleDrawerCarrer(true)
                                                }}
                                            />
                                        </Grid>
                                    );
                                })
                            }

                        </Grid>
                        <EventsTable
                            stateEdit={false}
                            allItems={reports}
                            items={reportList}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onViewCarrers={(items) => handleCarrers(true, items)}
                        />
                    </Stack>
                </Container>
            </Box>
            <ShowCarrers
                open={opendrawer.state}
                handleClose={() => handleCarrers(false, [])}
                items={opendrawer.items}
            />
        </>
    );
};

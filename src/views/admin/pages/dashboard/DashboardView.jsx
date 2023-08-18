import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { OverviewBars, OverviewCard, OverviewCircle } from './';
import { Event, Hail, Person2Outlined } from '@mui/icons-material';
import { useOverviewStore } from '../../../../hooks';
import { useSelector } from 'react-redux';

export const DashboardView = () => {
    const { getOverview } = useOverviewStore();
    const { overview } = useSelector((state) => state.reports);

    useEffect(() => {
        getOverview();
    }, []);

    const [chartSeries, setChartSeries] = useState([]);
    const [carrerasPorCampus, setCarrerasPorCampus] = useState([]);

    useEffect(() => {
        if (Object.keys(overview).length !== 0) {
            const carrerasSet = new Set();
            const carrerasArray = [];

            overview.eventosPorCampus.forEach((campus) => {
                campus.carreras.forEach((carrera) => {
                    if (!carrerasSet.has(carrera.carrera)) {
                        carrerasSet.add(carrera.carrera);
                        carrerasArray.push(carrera.carrera);
                    }
                });
            });

            setCarrerasPorCampus(carrerasArray);

            const chartSeries = overview.eventosPorCampus.map((campus) => {
                const data = carrerasArray.map((carrera) => {
                    const carreraEncontrada = campus.carreras.find(
                        (c) => c.carrera === carrera
                    );
                    return carreraEncontrada ? carreraEncontrada.cantidad : 0;
                });

                return {
                    name: campus.campus,
                    data: data,
                };
            });

            setChartSeries(chartSeries);
        }
    }, [overview]);

    return (
        <>
            {Object.keys(overview).length !== 0 && (
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} lg={3}>
                                <OverviewCard
                                    // difference={12}
                                    positive
                                    sx={{ height: '100%' }}
                                    value={`${overview.total}`}
                                    title="Eventos"
                                >
                                    <Event />
                                </OverviewCard>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3}>
                                <OverviewCard
                                    // difference={12}
                                    positive
                                    sx={{ height: '100%' }}
                                    value={`${overview.countStudents}`}
                                    title="Estudiantes"
                                >
                                    <Person2Outlined />
                                </OverviewCard>
                            </Grid>
                            {/* <Grid item xs={12} sm={6} lg={3}>
                                <OverviewCard
                                    difference={12}
                                    positive
                                    sx={{ height: '100%' }}
                                    value="20"
                                    title="Expositores"
                                >
                                    <Hail />
                                </OverviewCard>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3}>
                                <OverviewCard
                                    difference={12}
                                    positive
                                    sx={{ height: '100%' }}
                                    value="10"
                                    title="Categorias"
                                >
                                    <Hail />
                                </OverviewCard>
                            </Grid> */}
                            <Grid item xs={12} lg={9}>
                                <OverviewBars
                                    chartSeries={chartSeries}
                                    carrers={carrerasPorCampus}
                                    sx={{ height: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <OverviewCircle
                                    chartSeries={overview.modality}
                                    sx={{ height: '100%' }}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            )}
        </>
    );
};

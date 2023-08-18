import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { Chart } from '../../../../components';

const useChartOptions = (labels) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent'
        },
        colors: [
            theme.palette.success.main,
            theme.palette.primary.main,
        ],
        dataLabels: {
            enabled: false
        },
        labels,
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };
};
export const OverviewCircle = ({ chartSeries, sx }) => {
    const chartOptions = useChartOptions(chartSeries.map((e) => e.name));

    const total = chartSeries.reduce((sum, item) => sum + item.cantidad, 0);

    return (
        <Card sx={sx}>
            <CardHeader title="Modalidades" />
            <CardContent>
                <Chart
                    height={250}
                    options={chartOptions}
                    series={chartSeries.map((e) => e.cantidad)}
                    type="donut"
                    width="100%"
                />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                >
                    {chartSeries.map((item) => {
                        const percentage = total !== 0 ? Math.round((item.cantidad / total) * 100) : 0;

                        return (
                            <Box
                                key={item.name}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography sx={{ my: 1 }} variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography color="text.secondary" variant="subtitle2">
                                    {percentage}%
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

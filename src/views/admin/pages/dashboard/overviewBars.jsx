import {
    Button,
    Card,
    CardContent,
    CardHeader,
    SvgIcon,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from '../../../../components';
import { RefreshOutlined } from '@mui/icons-material';

const useChartOptions = (carrers = []) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: [
            theme.palette.carrers.lightest,
            theme.palette.carrers.light,
            theme.palette.carrers.main,
            theme.palette.carrers.dark],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: 'solid'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        legend: {
            show: true
        },
        plotOptions: {
            bar: {
                columnWidth: '8px'
            }
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 1
        },
        theme: {
            mode: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
            categories: carrers,
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (value) => (value > 0 ? `${value} eventos` : `${value}`),
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        }
    };
};

export const OverviewBars = ({ chartSeries, sx, carrers }) => {
    const chartOptions = useChartOptions(carrers);

    return (
        <Card sx={sx}>
            <CardHeader
                action={(
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <RefreshOutlined />
                            </SvgIcon>
                        )}
                    >
                        Actualizar
                    </Button>
                )}
                title="Eventos Historicos"
            />
            <CardContent>
                <Chart
                    height={350}
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    width="100%"
                />
            </CardContent>
        </Card>
    );
};

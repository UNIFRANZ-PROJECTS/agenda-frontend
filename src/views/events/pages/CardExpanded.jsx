import { Button, Card, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { useAuthStore, useEventStore } from '../../../hooks';

export const CardExpanded = ({ event, openLogin }) => {

    const { statusStudent } = useAuthStore();
    const { studentAddEvent } = useEventStore();
    const AddEvent = () => {
        if (statusStudent === 'not-authenticated') {
            openLogin(true);
        } else {
            studentAddEvent(event.id);
        }
    }

    return (
        <Card sx={{ borderRadius: "15px", overflow: 'auto', }}
            style={{
                maxHeight: "600px",
            }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" sx={{ padding: "10px" }}>
                        <Grid item>
                            <Typography variant="overline">
                                {event.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Paper style={{ maxHeight: 320, overflow: 'auto', padding: "10px" }}>
                                {event.description}
                            </Paper>
                        </Grid>
                        <Button onClick={() => AddEvent()} variant="contained">
                            Asistir
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

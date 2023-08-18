import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './home';
import { EventsPage } from './events';
import { AuthPage } from './admin/auth';
import { LoginClient } from './LoginClient';
import { useAuthStore } from '../hooks';

const AppBar = ({ children }) => {
    const navigate = useNavigate();
    const { statusStudent, user, startLogout } = useAuthStore();
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        startLogout();
        navigate('/');
    }



    return (
        <>
            <Grid container sx={{ justifyContent: 'space-between', padding: '20px' }}>
                <Grid>
                    <h4 style={{ margin: '0' }}>{statusStudent === 'not-authenticated' ? 'Eventos' : `Hola ${user.name}`}</h4>
                    <h1 style={{ margin: '0' }}>Agenda UNIFRANZ</h1>
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Button
                        onClick={() => statusStudent === 'not-authenticated' ? setOpen(true) : logout()}
                        variant="contained" disableElevation sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {statusStudent === 'not-authenticated' ? 'INGRESAR' : 'SALIR'}
                    </Button>
                </Box>
            </Grid>
            {children}
            <LoginClient open={open} handleClose={handleClose} />
        </>
    );
};

export const RouterClient = () => {
    const { statusStudent } = useAuthStore();
    return (
        <Routes >
            <Route path="/" element={
                <>
                    <AppBar>
                        {
                            statusStudent === 'not-authenticated' ? <HomePage /> : <EventsPage />
                        }
                    </AppBar>
                </>
            } />
            <Route path="/admin" element={<AuthPage />} />
            <Route path="/:id" element={
                <>
                    <AppBar>
                        <EventsPage />
                    </AppBar>
                </>} />

        </Routes>
    );
};
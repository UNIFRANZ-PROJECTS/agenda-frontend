import React from 'react';
import ReactDOM from 'react-dom/client';


import { AgendaApp } from './AgendaApp';

import './styles.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { createPalette } from './create-palette';
// Define el tema de MUI con la tipografía personalizada

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440
        }
    },
    palette: createPalette(),
    typography: {
        fontFamily: 'unifranz',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px', // Establece el radio de los bordes para todos los botones
                },
            },
        },
    },
});

// Carga la fuente personalizada
const unifranzFontStyle = new FontFace('unifranz', `url(./src/assets/fonts/GTEestiProDisplay-Regular.woff2)`);

// Aplica la fuente personalizada
unifranzFontStyle.load().then(() => {
    document.fonts.add(unifranzFontStyle);
});



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AgendaApp />
        </ThemeProvider>
    </React.StrictMode>
)
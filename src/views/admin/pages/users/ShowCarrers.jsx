import React, { useEffect, useState } from 'react';
import { Drawer, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export const ShowCarrers = React.memo(({ open, handleClose, items = [] }) => {
    const [itemsList, setItemsList] = useState(items);

    useEffect(() => {
        setItemsList(items);
    }, [items]);

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: '50vh',
                    top: 'auto',
                    bottom: 0,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr',
                },
            }}
        >
            <div style={{ padding: '16px' }}>
                <Typography variant="h6">Carreras</Typography>
            </div>
            <TableContainer component={Paper} style={{ overflowY: 'auto' }}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell>Sede</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell>{row.campus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Drawer>
    );
});

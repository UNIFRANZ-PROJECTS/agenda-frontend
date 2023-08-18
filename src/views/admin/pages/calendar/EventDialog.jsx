import { CardMedia, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react";
import { GuestsTable } from "../guests";
import { applyPagination } from "../../../../utils/ApplyPagination";
import { StudentsTable } from "../students";

export const EventDialog = React.memo(({ open, handleClose, item }) => {
    //expositores
    const [pageGuest, setPageGuest] = useState(0);
    const [rowsPerPageGuest, setRowsPerPageGuest] = useState(5);
    const [guestList, setGuestList] = useState([])


    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChangeGuest = useCallback((_, value) => {
        setPageGuest(value);
    }, []);

    const handleRowsPerPageChangeGuest = useCallback((event) => {
        setRowsPerPageGuest(event.target.value);
    }, []);

    useEffect(() => {
        const defaultGuestList = applyPagination(
            item.guestIds,
            pageGuest,
            rowsPerPageGuest
        );

        setGuestList(defaultGuestList);
    }, [item.guestIds, pageGuest, rowsPerPageGuest]);
    //estudiantes

    const [pageStudent, setPageStudent] = useState(0);
    const [rowsPerPageStudent, setRowsPerPageStudent] = useState(5);
    const [studentList, setStudentList] = useState([])


    // Definir los callbacks para el cambio de página y el cambio de filas por página
    const handlePageChangeStudent = useCallback((_, value) => {
        setPageGuest(value);
    }, []);

    const handleRowsPerPageChangeStudent = useCallback((event) => {
        setRowsPerPageGuest(event.target.value);
    }, []);

    useEffect(() => {
        const defaultStudentList = applyPagination(
            item.studentIds,
            pageStudent,
            rowsPerPageStudent
        );

        setStudentList(defaultStudentList);
    }, [item.studentIds, pageStudent, rowsPerPageStudent]);
    return (
        <Dialog
            maxWidth="xl"
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                        <CardMedia component="img" src={item.image} alt="No Image" />
                    </Grid>
                    <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
                        <DialogTitle >
                            {item.title}
                        </DialogTitle>
                        <Typography
                            variant="subtitle1"
                        >
                            {item.description}
                        </Typography>
                        {
                            item.guestIds.length > 0 &&
                            <div>
                                <Typography
                                    variant="subtitle1"
                                >
                                    Expositores
                                </Typography>
                                <GuestsTable
                                    stateEdit={false}
                                    allItems={item.guestIds}
                                    items={guestList}
                                    onPageChange={handlePageChangeGuest}
                                    onRowsPerPageChange={handleRowsPerPageChangeGuest}
                                    page={pageGuest}
                                    rowsPerPage={rowsPerPageGuest}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                />
                            </div>
                        }
                        {
                            item.studentIds.length > 0 && <div>
                                <Typography
                                    variant="subtitle1"
                                >
                                    Estudiantes inscritos
                                </Typography>
                                <StudentsTable
                                    allItems={item.studentIds}
                                    items={studentList}
                                    onPageChange={handlePageChangeStudent}
                                    onRowsPerPageChange={handleRowsPerPageChangeStudent}
                                    page={pageStudent}
                                    rowsPerPage={rowsPerPageStudent}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    )
});

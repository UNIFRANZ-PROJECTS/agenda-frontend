import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { CardExpanded } from "./CardExpanded";
import { LoginClient } from "../../LoginClient";

export const CardEvent = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleOutsideClick = (e) => {
        if (cardRef.current && !cardRef.current.contains(e.target)) {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const [openLogin, setOpenLogin] = useState(false);


    const handleCloseLogin = () => {
        setOpenLogin(false);
    };
    return (
        <>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={cardRef}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            layoutId={event.id}
                            style={{
                                maxWidth: "80%",
                                maxHeight: "80%",
                            }}
                        >
                            <CardExpanded event={event} openLogin={setOpenLogin} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >
            <Grid
                key={event.id}
                item
                xs={12}
                sm={3}
                sx={{ padding: "10px" }}
            >
                <motion.div layoutId={event.id} onClick={handleCardClick}>
                    <Card
                        sx={{
                            borderRadius: "15px",
                            cursor: "pointer",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={event.image}
                            alt={event.title}
                            sx={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {event.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            </Grid>


            <LoginClient open={openLogin} handleClose={handleCloseLogin} />
        </>
    );
};

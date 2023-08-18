import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CategoriesCard } from "./CategoriesCard";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore, useCategorieStore, useEventStore } from "../../../hooks";
import { RemoveRedEye } from "@mui/icons-material";
import { CardEvent } from "./CardEvent";
import "react-calendar/dist/Calendar.css";
import "./Sample.css";
import { format } from "date-fns";
import React from 'react'
import Calendar from "react-calendar";
import { es } from "date-fns/locale";

export const EventsPage = () => {
    const navigate = useNavigate();
    const { getEvent } = useEventStore();
    const { getCategorie } = useCategorieStore();
    const { statusStudent } = useAuthStore();

    const {
        events = [],
        categories = [],
        categorySelect = "todos",
    } = useSelector((state) => state.events);
    const { id } = useParams();

    useEffect(() => {
        getCategorie();
        if (statusStudent === 'not-authenticated') {
            getEvent(id);
        } else {
            navigate('/');
        }
    }, [id, statusStudent]);

    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        if (categorySelect === "todos") {
            setFilteredEvents(events.filter(e => e.state));
        } else {
            const filtered = events.filter((event) =>
                event.categoryIds.map((e) => e.id).includes(categorySelect) && event.state
            );
            setFilteredEvents(filtered);
        }
    }, [categorySelect, events]);

    const [value, onChange] = useState(new Date());

    const normalizeDate = (date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        return normalizedDate;
    };

    const normalizeStart = (event) => normalizeDate(event.start);
    const normalizeEnd = (event) => {
        const normalizedEnd = normalizeDate(event.end);
        normalizedEnd.setHours(23, 59, 59, 999);
        return normalizedEnd;
    };

    const isEventDay = useCallback(
        (date) => {
            for (const event of filteredEvents) {
                const start = normalizeStart(event);
                const end = normalizeEnd(event);
                if (date >= start && date <= end) {
                    return true;
                }
            }
            return false;
        },
        [filteredEvents]
    );

    const CategoryTodos = {
        title: "Todos",
        icon: "todos",
        user: "todos",
        id: "todos",
        state: true,
    };

    const [daySelect, setDaySelect] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [calendar, setCalendar] = useState(true);
    useEffect(() => {
        if (daySelect) {
            if (isEventDay(daySelect)) {
                setCalendar(false);
            }
            const eventsOfDay = events.filter((event) => {
                const start = normalizeStart(event);
                const end = normalizeEnd(event);

                return daySelect >= start && daySelect <= end;
            });

            setSelectedEvents([
                ...eventsOfDay.filter((event) =>
                    categorySelect === "todos"
                        ? true
                        : event.categoryIds.map((e) => e.id).includes(categorySelect)
                ),
            ]);
        }
    }, [daySelect, categorySelect]);

    return (
        <Box>
            <Box sx={{ display: "flex", overflowX: "auto" }}>
                <CategoriesCard key={CategoryTodos.id} category={CategoryTodos} />
                {categories.length > 1 &&
                    categories.map((category) => (
                        <CategoriesCard key={category.id} category={category} />
                    ))}
            </Box>
            {calendar ? (
                events.filter(e => e.state).length > 0 && (
                    <Calendar
                        locale="es"
                        onChange={onChange}
                        value={value}
                        goToRangeStartOnSelect={false}
                        tileContent={({ date }) => {
                            if (isEventDay(date)) {
                                return <RemoveRedEye color="info" />;
                            }
                            return null;
                        }}
                        prev2Label={null}
                        next2Label={null}
                        onClickDay={setDaySelect}
                    />
                )
            ) : (
                <>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Button onClick={() => setCalendar(true)} variant="contained">
                                Regresar al Calendario
                            </Button>
                        </Grid>
                        <Grid item sx={{ flexGrow: 1, textAlign: "center" }}>
                            {format(new Date(daySelect), "'Día' dd 'de' MMMM 'del' yyyy", { locale: es })}
                        </Grid>
                    </Grid>

                    <Grid container>
                        {selectedEvents.map((event) => (
                            <CardEvent key={event.id} event={event} />
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

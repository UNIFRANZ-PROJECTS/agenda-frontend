import { useSelector } from 'react-redux';
import { getMessagesES, localizer } from '../../../../helpers';
import { CalendarEvent } from './CalendarEvent';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCategorieStore, useEventStore } from '../../../../hooks';
import { CategoriesCard } from '../../../events/pages/CategoriesCard';
import { Box } from '@mui/material';
import { EventDialog } from './EventDialog';



export const CalendarView = () => {
    const { getEventAdmin } = useEventStore();
    const { getCategorie } = useCategorieStore();
    useEffect(() => {
        getEventAdmin();
        getCategorie();
    }, []);
    const { events = [], categories = [], categorySelect = 'todos' } = useSelector((state) => state.events);
    const [lastView, setLastView] = useState('month');

    const eventStyleGetter = (event, start, end, isSelected) => {

        let newStyle = {
            backgroundColor: "#347CF7",
            color: 'white',
        };

        if (event.isMine) {
            newStyle.backgroundColor = "lightgreen"
        }

        return {
            className: "",
            style: newStyle
        };
    }

    const onSelect = (event) => {
        setitemSelect(event)
        handleDialog(true);
    }
    const [openDialog, setopenDialog] = useState(false);
    const [itemSelect, setitemSelect] = useState(false)
    const handleDialog = useCallback((value) => {
        setopenDialog(value);
    }, []);
    const CategoryTodos = {
        title: 'Todos', icon: 'todos', user: 'todos', id: 'todos', state: true
    };
    return (
        <>
            <Box sx={{ display: "flex", height: '100vh' }}>
                <Box sx={{ flex: "0 0 auto", minWidth: "100px", overflowX: "auto" }}>
                    <CategoriesCard
                        key={CategoryTodos.id}
                        category={CategoryTodos}
                    />
                    {categories.length > 1 &&
                        categories.map((category) => (
                            <CategoriesCard
                                key={category.id}
                                category={category}
                            />
                        ))}
                </Box>
                <Box sx={{ flex: "1 1 auto" }}>
                    <Calendar
                        culture='es'
                        localizer={localizer}
                        events={[...events.filter(e => e.state).map(({ start, end, ...rest }) =>
                        ({
                            start: new Date(start),
                            end: new Date(end),
                            ...rest
                        }))
                            .filter((e) => categorySelect === 'todos' ? true : e.categoryIds.map(e => e.id).includes(categorySelect))
                        ]}
                        defaultView={lastView}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 'calc( 100vh - 80px )' }}
                        messages={getMessagesES()}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            event: CalendarEvent
                        }}
                        onSelectEvent={onSelect}
                        onView={setLastView}
                    />
                </Box>
            </Box>
            {
                itemSelect &&
                <EventDialog
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemSelect}
                />
            }
        </>
    )
}
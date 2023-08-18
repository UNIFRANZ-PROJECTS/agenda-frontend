import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        categorySelect: 'todos',
        categories: [],
        events: [],
        guests: [],
    },
    reducers: {
        //categoriess
        setCategories: (state, action) => {
            state.categories = action.payload.categories;
        },
        setAddCategories: (state, action) => {
            state.categories = [...state.categories, action.payload.categorie];
        },
        setUpdateCategories: (state, action) => {
            state.categories = [...state.categories.map((e) => {
                if (e.id === action.payload.categorie.id) {
                    return {
                        ...action.payload.categorie
                    }
                }
                return e
            })];
        },
        setCategorySelect: (state, action) => {
            state.categorySelect = action.payload.id;
        },
        //events
        setEvents: (state, action) => {
            state.events = action.payload.events;
        },
        setAddEvents: (state, action) => {
            state.events = [...state.events, action.payload.event];
        },
        setUpdateEvents: (state, action) => {
            state.events = [...state.events.map((e) => {
                if (e.id === action.payload.event.id) {
                    return {
                        ...action.payload.event
                    }
                }
                return e
            })];
        },
        //guests
        setGuests: (state, action) => {
            state.guests = action.payload.guests;
        },
        setAddGuests: (state, action) => {
            state.guests = [...state.guests, action.payload.guest];
        },
        setUpdateGuests: (state, action) => {
            state.guests = [...state.guests.map((e) => {
                if (e.id === action.payload.guest.id) {
                    return {
                        ...action.payload.guest
                    }
                }
                return e
            })];
        },
    }
});

export const {
    //categoriess
    setCategories,
    setAddCategories,
    setUpdateCategories,
    setCategorySelect,
    //events
    setEvents,
    setAddEvents,
    setUpdateEvents,
    //guests
    setGuests,
    setAddGuests,
    setUpdateGuests,
} = eventSlice.actions;
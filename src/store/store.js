import { configureStore } from '@reduxjs/toolkit';
import { selectionSlice, authSlice, calendarSlice, uiSlice, eventSlice, userSlice, studentSlice, reportSlice, } from './';

export const store = configureStore({
    reducer: {
        selections: selectionSlice.reducer,

        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        events: eventSlice.reducer,
        users: userSlice.reducer,
        students: studentSlice.reducer,
        reports: reportSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
import { createSlice } from '@reduxjs/toolkit';

export const reportSlice = createSlice({
    name: 'report',
    initialState: {
        overview: {},
        reports: []
    },
    reducers: {
        //overview
        setOverview: (state, action) => {
            state.overview = action.payload.overview;
        },
        //report
        setReport: (state, action) => {
            state.reports = action.payload.reports;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setOverview, setReport } = reportSlice.actions;
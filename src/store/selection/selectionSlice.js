import { createSlice } from '@reduxjs/toolkit';

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        selection: [],
    },
    reducers: {
        setSelectAll: (state, action) => {
            console.log(action.payload)
            state.selection = [...state.selection, ...action.payload.selection];
        },
        setSelectOne: (state, action) => {
            console.log(action.payload)
            state.selection = [...state.selection, action.payload.select];
        },
        setDeselectAll: (state, action) => {
            state.selection = [...state.selection.filter((e) => !action.payload.selection.includes(e))];
        },
        setDeselectOne: (state, action) => {
            state.selection = [...state.selection.filter((e) => e !== action.payload.select)];
        },
        setClearAll: (state, action) => {
            state.selection = [];
        },
    }
});


// Action creators are generated for each case reducer function
export const { setSelectAll, setSelectOne, setDeselectAll, setDeselectOne, setClearAll } = selectionSlice.actions;
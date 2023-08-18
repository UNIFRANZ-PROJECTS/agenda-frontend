import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: []
    },
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload.students;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setStudents } = studentSlice.actions;
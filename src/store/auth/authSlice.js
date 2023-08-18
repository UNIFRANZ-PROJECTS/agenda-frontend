import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated','not-authenticated',
        user: {},
        statusStudent: 'not-authenticated',
        data: {},
        // errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            // state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.data = payload;
            // state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.statusStudent = 'not-authenticated';
            // state.errorMessage = payload;
        },

        onLoginStudent: (state, { payload }) => {
            state.statusStudent = 'authenticatedStudent';
            state.user = payload;
            // state.errorMessage = undefined;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onLoginStudent } = authSlice.actions;
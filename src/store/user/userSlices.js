import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        sedes: [
            {
                id: '1',
                name: 'La Paz'
            },
            {
                id: '2',
                name: 'El Alto'
            },
            {
                id: '3',
                name: 'Cochabamba'
            },
            {
                id: '4',
                name: 'Santa Cruz'
            }
        ],
        modalities: [
            {
                id: '1',
                name: 'virtual'
            },
            {
                id: '2',
                name: 'presencial'
            },
        ],
        users: [],
        typeUsers: [],
        roles: [],
        permisions: [],
        carrers: [],
    },
    reducers: {
        //users
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        setAddUser: (state, action) => {
            state.users = [...state.users, action.payload.user];
        },
        setUpdateUser: (state, action) => {
            state.users = [...state.users.map((e) => {
                if (e.id === action.payload.user.id) {
                    return {
                        ...action.payload.user
                    }
                }
                return e
            })];
        },
        //type users
        setTypeUsers: (state, action) => {
            state.typeUsers = action.payload.typeUsers;
        },
        setAddTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers, action.payload.typeUser];
        },
        setUpdateTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers.map((e) => {
                if (e.id === action.payload.typeUser.id) {
                    return {
                        ...action.payload.typeUser
                    }
                }
                return e
            })];
        },
        //roles
        setRoles: (state, action) => {
            state.roles = action.payload.roles;
        },
        setAddRole: (state, action) => {
            state.roles = [...state.roles, action.payload.role];
        },
        setUpdateRole: (state, action) => {
            state.roles = [...state.roles.map((e) => {
                if (e.id === action.payload.role.id) {
                    return {
                        ...action.payload.role
                    }
                }
                return e
            })];
        },
        //permisions
        setPermisions: (state, action) => {
            state.permisions = action.payload.permisions;
        },
        setAddPermision: (state, action) => {
            state.permisions = [...state.permisions, action.payload.permision];
        },
        //carrers
        setCarrers: (state, action) => {
            state.carrers = action.payload.carrers;
        },
    }
});

export const {
    //users
    setUsers,
    setAddUser,
    setUpdateUser,
    //type users
    setTypeUsers,
    setAddTypeUser,
    setUpdateTypeUser,
    //roles
    setRoles,
    setAddRole,
    setUpdateRole,
    //permisions
    setPermisions,
    setAddPermision,
    //carrers
    setCarrers,
} = userSlice.actions;
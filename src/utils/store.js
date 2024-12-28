import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Slice: Define el estado inicial y los reducers
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAuthenticated: false },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.client = null;
            state.isAuthenticated = false;
        },
        name: (state, action) => {
            state.client = action.payload.client;
        }
    },
});

// 2.- Exporta las acciones (login, logout)
export const { login, logout, name } = authSlice.actions;

// 3. Configura el store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;

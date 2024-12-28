import { configureStore, createSlice } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// Configuración de redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Slice: Define el estado inicial y los reducers
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAuthenticated: false, client: null },
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
        },
    },
});

// Crear persist
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// Configura el store
const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

const persistor = persistStore(store);

// Exportar
export const { login, logout, name } = authSlice.actions;
export { store, persistor };

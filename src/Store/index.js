// ON FABRIQUE LE STORE GLOBAL 
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js';

export const store = configureStore({
    reducer: {
        // "user" est un rayon du store et sera accessible via state.user dans toute l'app
        user: userReducer,
    },
})
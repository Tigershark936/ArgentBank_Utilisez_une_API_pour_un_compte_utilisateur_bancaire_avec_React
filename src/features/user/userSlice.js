import { createSlice } from '@reduxjs/toolkit';

// ÉTAT DE DÉPART : personne n'est connecté
const initialState = {
    isLogginIn: false, // false = pas connecté, true = connecté
    name: null, // Et je stocke le nom en + 
}

// Je crée le rayon (slice) user 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // login = "L'utilisateur entre dans l'app"
        login: (state, action) => {
           state.isLogginIn = true  
           state.name = typeof action.payload === 'string'
            ? action.payload
            : action.payload?.name ?? null
        },

        // logout = "L'utilisateur sort de l'app"
        logout: (state) => {
            state.isLogginIn = false
            state.name = null
        },
    },
})

export const { login , logout } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS } from './authStatus.js';

// ÉTAT DE DÉPART : personne n'est connecté
const initialState = {
    token: localStorage.getItem("token") || null, // Je récupère la valeur associée à la clé "token" dans le localStorage (si elle existe), sinon je mets null par défaut
    isLoggedIn: false, // false = pas connecté, true = connecté
    name: null, // Et je stocke le nom affiché en + (par ex. "Tony Stark")
    status: AUTH_STATUS.NOT_STARTED, // état initial où rien n'est lancé encore
    error: null, // message d'erreur (ex. mauvais mot de passe)
    
}

// Je crée le rayon (slice) user 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 🔵 Quand l'utilisateur clique sur "Sign In"
        loginRequest: (state) => {
            state.status = AUTH_STATUS.LOADING; // on passe en "chargement"
            state.error = null;                 // on efface les erreurs précédentes
        },

        // 🟢 Quand le serveur répond OK avec un token
        // action.payload doit contenir { token, name }
        loginSuccess: (state, action) => {
            const { token, name } = action.payload || {};
        
            state.token = token || null; // on garde le token reçu
            state.isLoggedIn = !!token; // connecté si on a bien un token
            state.name = name ?? null; // on enregistre le nom si fourni
            state.status = AUTH_STATUS.SUCCEEDED; // succès
            state.error = null; // aucune erreur

            if (token) localStorage.setItem("token", token); // on garde le token dans le navigateur
        },

        // 🔴 Quand le serveur répond avec une erreur (mauvais mdp, serveur HS(backend))
        // action.payload = message d'erreur
        loginFailure: (state, action) => {
            state.token = null; // pas de badge
            state.isLoggedIn = false; // pas connecté
            state.status = AUTH_STATUS.FAILED; // échec du login
            state.error = action.payload || "Login failed"; // message d'erreur
            localStorage.removeItem("token"); // on nettoie le navigateur
        },

        // 🔵 Quand l'utilisateur se déconnecte ("Sign Out")
        logout: (state) => {
            state.token = null; // on retire le badge
            state.isLoggedIn = false; // plus connecté
            state.name = null; // plus de nom affiché
            state.status = AUTH_STATUS.NOT_STARTED; // retour à l'état initial
            state.error = null; // aucune erreur
            localStorage.removeItem("token"); // on efface le token dans le navigateur
        },
    }
})

// j'exporte les actions (loginRequest, loginSuccess, loginFailure, logout) pour pouvoir les utiliser dans les composants React du projet.
export const { loginRequest , loginSuccess, loginFailure, logout } = userSlice.actions

// J'exporte le reducer, pour l'ajouter dans le store Redux.
export default userSlice.reducer
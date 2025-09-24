import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_STATUS } from './authStatus.js';

// THUNK ASYNCHRONE 
export const authUser = createAsyncThunk(
    'user/auth', // NEW: identifiant d'action exact demandé
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // 1) j’appelle l’API de login avec email+password
            const res = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST', // envoi des données au serveur pour créer ou vérifier quelque chose.
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email.trim(), 
                    password 
                }),
            })

            // 2) je tente de lire la réponse (JSON)
            const json = await res.json().catch(() => null)
            console.log("[Login] Réponse JSON :", json);
            
            // 3) si le HTTP n’est pas OK
            if (!res.ok) return rejectWithValue('Identifiants ou mot de passe incorrects')

            // 4) je récupère le token renvoyé par l’API    
            const token = json?.body?.token
            // SI pas de token dans la réponse → ça veut dire que le login a échoué + msg
            if (!token) return rejectWithValue('Identifiants ou mot de passe incorrects')

            return token
        } catch {
        return rejectWithValue('Identifiants ou mot de passe incorrects')
        }
    }
);

// ÉTAT DE DÉPART : personne n'est connecté
const initialState = {
    token: localStorage.getItem("token") || null, // Je récupère la valeur associée à la clé "token" dans le localStorage (si elle existe), sinon je mets null par défaut
    isLoggedIn: !!localStorage.getItem("token"), // false = pas connecté, true = connecté 
    name: localStorage.getItem("name") ?? null, // Et je stocke le nom affiché en + (par ex. "Tony Stark"),et restaure depuis le localStorage si dispo
    status: localStorage.getItem("token") ? AUTH_STATUS.SUCCEEDED : AUTH_STATUS.NOT_STARTED, // état initial où rien n'est lancé encore, ou succès si token présent
    error: null, // message d'erreur (ex. mauvais mot de passe)
}

// Je crée le rayon (slice) user 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfileName: (state, action) => {
            state.name = action.payload || null;
            if (state.name) {
                localStorage.setItem("name", state.name); // on stocke le nom quand on le connaît
            } else {
                localStorage.removeItem("name"); // supprime si null
            }
        },

        // 🔵 Quand l'utilisateur se déconnecte ("Sign Out")
        logout: (state) => {
            state.token = null; // on retire le badge
            state.isLoggedIn = false; // plus connecté
            state.name = null; // plus de nom affiché
            state.status = AUTH_STATUS.NOT_STARTED; // retour à l'état initial
            state.error = null; // aucune erreur
            localStorage.removeItem("token"); // on efface le token dans le navigateur
            localStorage.removeItem("name"); // on efface le nom
        },
    },

    // Gestion des 3 cas du thunk (pending / fulfilled / rejected)
    extraReducers: (builder) => {
        builder
        // 🔵 Quand l'utilisateur clique sur "Sign In"
        // pending (en attente) "remplace mon loginRequest"
        .addCase(authUser.pending, (state) => {
            state.status = AUTH_STATUS.LOADING;
            state.error = null;
        })
        // 🟢 Quand le serveur répond OK avec un token
        // fulfilled (accompli) "remplace mon loginSuccess"
        .addCase(authUser.fulfilled, (state, action) => {
            const token = action.payload // le thunk renvoie un token string
            state.token = token; // on garde le token reçu
            state.isLoggedIn = true // connecté si on a bien un token
            state.status = AUTH_STATUS.SUCCEEDED; // succès
            state.error = null; // aucune erreur

            if (token) localStorage.setItem("token", token); // on garde le token dans le navigateur
        }) 
        // 🔴 Quand le serveur répond avec une erreur (mauvais mdp, serveur HS(backend)) 
        //  rejected (rejeté) "remplace mon loginFailure"
        .addCase(authUser.rejected, (state, action) => {
            state.token = null; // on retire le badge
            state.isLoggedIn = false; // plus connecté
            state.status = AUTH_STATUS.FAILED; // échec du login
            state.error = action.payload || "Impossible de récupérer l'utilisateur"; // message d'erreur
            localStorage.removeItem("token"); // on efface le token dans le navigateur
            localStorage.removeItem("name"); // on efface le nom            
        });
    }
})

// j'exporte les actions (setProfileName, logout) pour pouvoir les utiliser dans les composants React du projet.
export const { setProfileName, logout } = userSlice.actions

// J'exporte le reducer, pour l'ajouter dans le store Redux.
export default userSlice.reducer

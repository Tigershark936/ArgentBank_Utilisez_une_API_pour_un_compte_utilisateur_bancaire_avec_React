import { useState } from "react";

const useFetch = () => {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Cherche mon badge (token) dans le casier localStorage
    const token = localStorage.getItem("token")
    console.log("Token récupéré :", token);

    // La fonction qui me lance l'appel API avec l'adresse du serveur , les infos à envoyer et de la methode(action)
    const fetchRequest = async (url, body, method = 'GET') => {
        const headers = {
            // Info au serveur : " attention, les infos que je t'envoie sont en JSON"
            "Content-Type": "application/json"
        }

        // SI j'ai bien le token → j'ajoute une ligne "Authorization" aux headers
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        // ⚠️ Si pas de token → je n'ajoute rien → donc pas de "Bearer null"

        const options = {
            method, // GET, POST, PUT, PATCH et DELETE
            headers,
        };

        if (body) {
            // ça ajoute le payload (ex: email/password) dans la requête fetch
            // transforme l'objet JS en texte JSON lisible par le serveur
            options.body = JSON.stringify(body);
            console.log("Message envoyé au serveur :", options.body);
        }
        
        try {
            // en train de charger
            setLoading(true);

            // Nettoie l’erreur avant de relancer
            setError(null);

            // 1. Lancer la requête et attend la réponse du serveur
            const res = await fetch(url, options);

            // 2) je tente de lire le JSON (si vide, ça renvoie null)
            const json = await res.json().catch(() => null);

            setData(json);
        } catch (e) {
            setError(e.message || "Erreur réseau");
        } finally {
            console.log("Fin de recherche de la requête useFetch");
            setLoading(false)
        }
    }

    // l'accès aux 4 "tiroirs" d'état pour mes composants
    return { isLoading, data, error, fetchRequest}
}

export default useFetch;
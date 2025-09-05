import { useState, useEffect } from "react";

const useFetch = (url, method = "GET", body = null) => {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Cherche mon badge (token) dans le casier localStorage
    const token = localStorage.getItem("token")
    console.log("Token récupéré :", token);

    useEffect(() => {
        // Je commence à préparer mes headers, on colle sur la requête pour donner des infos au serveur
        const headers = {
            // Info au serveur : " attention, les infos que je t’envoie sont en JSON"
            "Content-Type": "application/json"
        }

        // SI j’ai bien le token → j’ajoute une ligne "Authorization" aux headers
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        // ⚠️ Si pas de token → je n’ajoute rien → donc pas de "Bearer null"

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

        // -------------------------
        // La requête au serveur
        // -------------------------
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null); 

                // 1. Lancer la requête
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
        if (url) fetchData();
    }, [url, method, token, JSON.stringify(body)]);

    // l’accès aux 3 “tiroirs” d’état pour mes composants
    return { isLoading, data, error}
}

export default useFetch;
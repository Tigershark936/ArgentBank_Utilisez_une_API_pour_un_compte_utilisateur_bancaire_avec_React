import UserWelcome from "./UserWelcome";
import AccountCard from "./AccountCard";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileName } from "../../features/user/userSlice.js";

// ---- Données des comptes statiques (maquette) ----
const accounts = [
    { id: "chk", title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { id: "sav", title: "Argent Bank Savings (x6712)",  amount: "$10,928.42", description: "Available Balance" },
    { id: "cc",  title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
];

const ProfilePage = () => {
    const dispatch = useDispatch();

    // Je récupère le token soit depuis Redux, soit depuis le localStorage pour prouver à l'API qu'on est connecté (authentifié).
    const tokenFromRedux = useSelector((state) => state.user.token);
    const token = tokenFromRedux || localStorage.getItem("token");

    //Création de 2 hooks useFetch:
    // - le premier pour LIRE le profil
    const { data: dataProfile, isLoading: isLoadingProfile, error: errorProfile, fetchRequest: fetchRequestGetProfile } = useFetch();
    // - le second pour METTRE À JOUR le profil
    const { error: errorProfileUpdated, fetchRequest: fetchRequestUpdateProfile } = useFetch();

  // L’API demande un POST sur /user/profile avec Authorization: Bearer <token> pour avoir le bon profil auprès du serveur
    useEffect(() => {    
        const fetchProfile = async () => {
            await fetchRequestGetProfile("http://localhost:3001/api/v1/user/profile", null, "POST")
        }
        fetchProfile();
    }, []);

    // Quand les données arrivent, je pousse le firstName dans Redux
    // But : que le Header (qui lit Redux) affiche le prénom.
    useEffect(() => {      
        if (dataProfile?.body) {
            dispatch(setProfileName(dataProfile.body.firstName));
            setLocalFirstName(dataProfile.body.firstName);
            setLocalLastName(dataProfile.body.lastName);
        }
    }, [dataProfile]);

    //États locaux pour affichage/édition immédiate
    // On copie le prénom/nom reçus du backend dans des states locaux pour voir le changement tout de suite après "Save",
    const [localFirstName, setLocalFirstName] = useState("");
    const [localLastName,  setLocalLastName]  = useState("");

    // isSaving : vrai pendant l'appel PUT (désactive le bouton Save)
    // saveError : message d'erreur si la sauvegarde échoue (validation/api/réseau)
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    if (isLoadingProfile) {
        return (
            <main className="main bg-dark">
                <p style={{ color: "#fff" }}>Chargement du profil…</p>
            </main>
        );
    }

    if (errorProfile) {
        return (
            <main className="main bg-dark">
                <p style={{ color: "crimson" }}>Erreur : {errorProfile}</p>
            </main>
        );
    }

    // 5) Sauvegarder le prénom/nom 
    // Cette fonction est appelée par UserWelcome quand l'utilisateur valide le formulaire.
    // Elle retourne TRUE si la sauvegarde réussit, FALSE sinon (pour que UserWelcome ferme l'édition direct en cas de succès).
    const handleEditName = async (newFirstName, newLastName) => {
        // 5.1 Efface l'ancien message d'erreur avant de commencer
        setSaveError("");

        // 5.2 Sécuriser et nettoyer (transforme en string et enlève les espaces)
        const updatedFirstName = String(newFirstName ?? "").trim();
        const updatedLastName  = String(newLastName  ?? "").trim();

        // 5.3 Validation basique côté client (Input vide)
        if (!updatedFirstName || !updatedLastName) {
            setSaveError("Please provide the first name and last name.");
            return false; // Alors rien n'a été sauvegardé car manque un champs non remplis
        }

        // 5.4 Vérifier le token (authentification)
        if (!token) {
            setSaveError("Token manquant : veuillez vous reconnecter.");
            return false; // pas de sauvegarde
        }

        // 5.5 Indiquer La save (désactiver le bouton Save)
        setIsSaving(true);

        try {
            // 5.6 Appel PUT pour envoyer à l'API et mettre à jour le profil
            fetchRequestUpdateProfile(
              "http://localhost:3001/api/v1/user/profile",
              {firstName: updatedFirstName, lastName: updatedLastName, },
              "PUT"
            )

            // Si tout est OK (HTTP ok + status 200 côté backend)
            if (!errorProfileUpdated) {

              // Mets à jour l’affichage immédiat
              setLocalFirstName(updatedFirstName)
              setLocalLastName(updatedLastName)

                // a) Redux → le Header lira le bon prénom partout
                dispatch(setProfileName(updatedFirstName));

                // Succès : on retourne true (UserWelcome pourra fermer le mode l'édition)
                return true;

            } else {
                // API a répondu mais avec une erreur (validation, etc.)
                setSaveError(errorProfileUpdated);
                return false;
            }

        } catch {
            // Erreur réseau (pas d'internet, serveur down… )
            setSaveError("Erreur réseau. Réessaie plus tard.");
            return false;
        } finally {
            // fin : on réactive le bouton "Save"
            setIsSaving(false);
        }
    };

    // Ouvrir transactions d'un compte
    const handleViewTransactions = () => {
        // TODO: navigate() vers la page transactions quand elle sera prête
    };

    return (
        <>
            <UserWelcome
                firstName={localFirstName}
                lastName={localLastName}
                onEdit={handleEditName} // fonction de sauvegarde (PUT)
                isSaving={isSaving} // pour désactiver Save pendant la requête
                error={saveError} // message à afficher si la sauvegarde échoue
            />

            <h2 className="sr-only">Accounts</h2>

            {/* Affichage de la liste des comptes suite à la maquette */}
            {accounts.map((a) => (
                <AccountCard
                    key={a.id}
                    title={a.title}
                    amount={a.amount}
                    description={a.description}
                    onView={() => handleViewTransactions(a.id)}
                />
            ))}
        </>
    );
};

export default ProfilePage;
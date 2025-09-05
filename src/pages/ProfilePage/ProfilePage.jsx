import UserWelcome from "./UserWelcome";
import AccountCard from "./AccountCard";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileName } from "../../features/user/userSlice";

const accounts = [
  { id: "chk", title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
  { id: "sav", title: "Argent Bank Savings (x6712)",  amount: "$10,928.42", description: "Available Balance" },
  { id: "cc",  title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
];

const ProfilePage = () => {
  const dispatch = useDispatch();

  // 1) Je lis le profil (l’API ArgentBank demande bien un POST pour /user/profile)
  const { data, isLoading, error } = useFetch(
    "http://localhost:3001/api/v1/user/profile",
    "POST"
  );

  // 2) Dès que les données arrivent, je pousse le firstName dans Redux → pour le Header
  useEffect(() => {
    const firstName = data?.body?.firstName;
    if (firstName) {
      dispatch(setProfileName(firstName));
    }
  }, [data, dispatch]);

  // 3) Je récupère les infos utiles de la réponse (en sécurité si data n’est pas encore là)
  const firstName = data?.body?.firstName ?? "Utilisateur";
  const lastName  = data?.body?.lastName  ?? "";

  if (isLoading) {
    return (
      <main className="main bg-dark">
        <p style={{ color: "#fff" }}>Chargement du profil…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main bg-dark">
        <p style={{ color: "crimson" }}>Erreur : {error}</p>
      </main>
    );
  }

  const handleEditName = () => {
    // TODO: ouvrir un modal / page d’édition
  };

  const handleViewTransactions = () => {
    // TODO: navigate()
  };

  return (
    <>
      <UserWelcome firstName={firstName} lastName={lastName} onEdit={handleEditName} />
      <h2 className="sr-only">Accounts</h2>

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

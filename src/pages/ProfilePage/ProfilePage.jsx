import UserWelcome from "./UserWelcome";
import AccountCard from "./AccountCard";

const accounts = [
  { id: "chk", title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
  { id: "sav", title: "Argent Bank Savings (x6712)",  amount: "$10,928.42", description: "Available Balance" },
  { id: "cc",  title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
];

const ProfilePage = () => {
  const handleEditName = () => {
    // TODO: ouvrir un modal / page d’édition
  };

  const handleViewTransactions = () => {
    // TODO: navigate()
  };

  return (
    <>
      <UserWelcome firstName="Tony" lastName="Jarvis" onEdit={handleEditName} />
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

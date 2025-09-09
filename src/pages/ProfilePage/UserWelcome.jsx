import { useEffect, useMemo, useState } from "react";

const UserWelcome = ({ firstName, lastName, onEdit, isSaving = false, error = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName || "");
  const [lastNameInput, setLastNameInput] = useState(lastName || "");

  // Si firstName/lastName changent, je remets les inputs à jour pour rester synchro avec le backend.
  useEffect(() => {
    setFirstNameInput(firstName || "");
    setLastNameInput(lastName || "");
  }, [firstName, lastName]);

  // isDirty = TRUE si l’utilisateur a changé quelque chose (prénom ou nom). Sinon FALSE.
  const isDirty = useMemo(() => {
    // Je compare ce qu’il y a dans les inputs avec les valeurs actuelles (props). Et si changement alors sauvegarde.
    return (firstNameInput ?? "") !== (firstName ?? "") || (lastNameInput ?? "") !== (lastName ?? "");
  }, [firstNameInput, lastNameInput, firstName, lastName]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    // onEdit doit renvoyer true si succès, false si échec
    const ok = await onEdit(firstNameInput, lastNameInput);
    if (ok) {
      setIsEditing(false); // ferme l’édition immédiatement après succès
    }
  };

  // Fonction pour quand on clique sur "Cancel" on remet les values comme avant 
  const handleCancel = () => {
    setFirstNameInput(firstName || "");
    setLastNameInput(lastName || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e); // ← Si j’appuie sur la touche Entrée, ça valide (comme cliquer sur "Save")
    if (e.key === "Escape") handleCancel(); // // ← Si j’appuie sur la touche Échap, ça annule (comme cliquer sur "Cancel")
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back<br />
              {firstName} {lastName} !
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="edit-form">
            <h1>Edit Your Profile</h1>

            {/* Inputs en row (côte à côte) */}
            <div className="field-row">
              <input
                id="firstName"
                type="text"
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
                disabled={isSaving}
                placeholder="First name"
                autoFocus
              />
              <input
                id="lastName"
                type="text"
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                disabled={isSaving}
                placeholder="Last name"
              />
            </div>

            {error ? <p className="error">{error}</p> : null}

            <div className="actions">
              <button
                type="submit"
                className="save-button"
                disabled={isSaving || !isDirty}
                aria-busy={isSaving}
              >
                {isSaving ? "Saving…" : "Save"}
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default UserWelcome;

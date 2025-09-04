// Je définit les différents états possibles de l'authentification avec une constante qui représente un ensemble de valeurs fixes
export const AUTH_STATUS = {
  NOT_STARTED: "not_started",   // aucune tentative de login n'a été faite
  LOADING: "loading",           // L'utilisateur a cliqué sur "Sign In", login en cours et attend API
  SUCCEEDED: "succeeded",       // L'API a répondu OK, login réussi
  FAILED: "failed",             // L'API a répondu ERREUR, login échoué
};
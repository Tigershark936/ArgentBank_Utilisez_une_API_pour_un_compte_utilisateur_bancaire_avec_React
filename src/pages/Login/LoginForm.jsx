import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../../features/user/userSlice";
import { AUTH_STATUS } from "../../features/user/authStatus";
import InputField from './Form/InputField'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Rajout de l'état pour le bouton avec en + le message d'erreur
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);   

  const handleSubmit = async (e) => {
    e.preventDefault();         
    dispatch(loginRequest());
    setLoading(true);
    setError(null);            

    try {

      // 1) j’appelle l’API de login avec email+password
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST", // envoi des données au serveur pour créer ou vérifier quelque chose.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: username.trim(), 
          password }),
      });

      // 2) je tente de lire la réponse (JSON) 
      const json = await res.json().catch(() => null);
      console.log("[Login] Réponse JSON :", json);

      // 3) si le HTTP n’est pas OK
      if (!res.ok) {
        throw new Error("Identifiants ou mot de passe incorrects");
      }

      // 4) je récupère le token renvoyé par l’API
      const token = json?.body?.token;
      // SI pas de token dans la réponse → ça veut dire que le login a échoué + msg
      if (!token) throw new Error("Identifiants ou mot de passe incorrects");

      // 5) je sauvegarde le token (Redux + localStorage dans le reducer)
      dispatch(loginSuccess({ token }));

      // 6) “Remember me”
      if (remember) {
        localStorage.setItem("remember", "1");
      } else {
        localStorage.removeItem("remember");
      }

      navigate("/profile");

    } catch {
      // 🔴 status = FAILED
      const msg = "Identifiants ou mot de passe incorrects"; 
      dispatch(loginFailure(msg));
      // j'affiche comme ça un msg pour l'UI gràce a l'état
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError(null);
        }}
        autoComplete="username"
        required
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);       
        }}
        autoComplete="current-password"
        required
      />

      <div className="input-remember">
        <input
          id="remember-me"
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      {/* AJOUT: message d'erreur en rouge pour l'UI*/}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          style={{ 
            color: "crimson",
            marginTop: 8,
            fontWeight: "bold",
            fontFamily: "Helvetica, Arial, sans-serif"
           }}
        >
          {error}
        </p>
      )}

      {/* Rajout: d'un effet de texte dynamique pour montrer le loading avec le backend */}
      <button type="submit" className="sign-in-button" disabled={loading}>
        {loading ? "Loading …" : "Sign In"} 
      </button>
    </form>
  );
};

export default LoginForm;

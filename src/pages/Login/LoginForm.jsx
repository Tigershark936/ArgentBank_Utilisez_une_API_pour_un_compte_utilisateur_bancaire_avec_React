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

  const handleSubmit = async (e) => {
    e.preventDefault();         
    dispatch(loginRequest());

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
        // ❌ Si le serveur me répond avec une erreur HTTP (ex: 400, 401, 500…)
        const msg = (json && (json.message || json.error)) || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      // 4) je récupère le token renvoyé par l’API
      const token = json?.body?.token;
      // SI pas de token dans la réponse → ça veut dire que le login a échoué
      if (!token) throw new Error("Token manquant dans la réponse API");

      // 5) je sauvegarde le token (Redux + localStorage dans le reducer)
      dispatch(loginSuccess({ token }));

      // 6) “Remember me”
      if (remember) {
        localStorage.setItem("remember", "1");
      } else {
        localStorage.removeItem("remember");
      }

      navigate("/profile");

    } catch (err) {
      // 🔴 status = FAILED
      dispatch(loginFailure(err.message || "Login failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        required
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { authUser } from "../../features/user/userSlice";
import { AUTH_STATUS } from "../../features/user/authStatus";
import InputField from './Form/InputField'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // purement visuel 
  const [remember, setRemember] = useState(false);

  // Rajout de l'état pour le bouton avec en + le message d'erreur
  const { status, error, isLoggedIn } = useSelector((s) => s.user)
  const loading = status === AUTH_STATUS.LOADING

  const handleSubmit = async (e) => {
    e.preventDefault();         
    dispatch(authUser({ email: username, password }))           
  };
  
  // La redirection après succès d'authentification
  useEffect(() => {
    if (isLoggedIn && status === AUTH_STATUS.SUCCEEDED) {
      navigate("/profile");
    }
  }, [isLoggedIn, status, navigate])

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
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
      {status === AUTH_STATUS.FAILED && error && (
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

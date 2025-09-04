import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/user/userSlice";
import InputField from './Form/InputField'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: brancher ma future API ici
    // Pour l’instant on simule un succès
    dispatch(
      loginSuccess({
        token: "fake123",      // plus tard je mettrai le vrai token que je n'arrive pas a avoir 
        name: username,        // ici j’utilise username pour afficher le name dans le Header
      })
    );
    navigate("/profile");
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

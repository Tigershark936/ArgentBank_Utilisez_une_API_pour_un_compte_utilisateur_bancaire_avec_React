import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../../features/user/userSlice";
import InputField from './Form/InputField'

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest());
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

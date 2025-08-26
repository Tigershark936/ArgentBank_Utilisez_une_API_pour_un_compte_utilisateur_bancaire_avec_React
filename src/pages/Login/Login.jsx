import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle" aria-hidden="true"></i>
      <h1>Sign In</h1>
      <LoginForm />
    </section>
  );
};

export default Login;

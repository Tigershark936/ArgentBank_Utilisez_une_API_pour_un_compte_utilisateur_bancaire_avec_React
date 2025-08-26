import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // on vérifie si l’URL commence par "/profile"
  // Ex : "/profile" → true, "/profile/edit" → true, "/login" → false
  const isProfilePage = pathname.startsWith("/profile");

  /**  This fonction s'applique quand on clique sur "Sign Out" 
  * (déconnexion = retour à la page d’accueil)
  * Permet alors de redirige vers la page d’accueil
  */
  const handleSignOut = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div>
        {isProfilePage ? (
          <>
          {/* Affiche "Firstname" avec l’icône user */}
            <NavLink className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle" aria-hidden="true" />
              {" "}Tony{}
            </NavLink>

            {/* Sign Out visible seulement sur le path /profile */}
            <NavLink className="main-nav-item" href="/" onClick={handleSignOut}>
              <i className="fa fa-sign-out" aria-hidden="true" />
              {" "}Sign Out
            </NavLink>
          </>
        ) : (
          /* SINON (donc pas sur /profile) :
          Affiche "Sign In" avec l’icône user, qui mène vers la page de connexion*/
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle" aria-hidden="true" />
            {" "}Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;

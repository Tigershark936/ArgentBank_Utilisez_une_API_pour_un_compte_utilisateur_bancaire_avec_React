import { NavLink, useLocation, useNavigate } from "react-router-dom";
// Ces deux hooks me servent à LIRE et à MODIFIER le store
import { useSelector, useDispatch } from 'react-redux'
// Le bouton "logout" qui est créé dans le userSlice
import { logout } from '../../features/user/userSlice'
import logo from "../../assets/img/argentBankLogo.png";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // État global Redux
  // true/false : est-ce que l’utilisateur est connecté ?
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  // le nom affiché dans le header (peut être null si pas connecté)
  const userName = useSelector((state) => state.user.name);

  // Récupère le facteur (dispatch) pour envoyer des "post-it" (actions)
  const dispatch = useDispatch();

  // on vérifie si l’URL commence par "/profile"
  // Ex : "/profile" → true, "/profile/edit" → true, "/login" → false
  const isProfilePage = pathname.startsWith("/profile");

  /**  This fonction s'applique quand on clique sur "Sign Out" 
  * 1) On vide le rayon "user" (logout)
  * 2) (déconnexion = retour à la page d’accueil)
  * Permet alors de redirige vers la page d’accueil
  */
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout()) 
    navigate("/", { replace: true });
  };

  return (
    <nav className="main-nav">
      {/* Logo → retour accueil */}
      <NavLink 
        className="main-nav-logo" 
        to="/"
      >
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div>
        {isLoggedIn ? (
          <>
            {/* Affiche "Firstname" avec l’icône user */}
            <NavLink
              className="main-nav-item"
              to="/profile"
              aria-current={isProfilePage ? "page" : undefined}
            >
              <i className="fa fa-user-circle" aria-hidden="true" />
              {" "}{userName ?? "Utilisateur"}
            </NavLink>

            {/* Sign Out visible UNIQUEMENT sur le path /profile */}
            {isProfilePage && (
              <NavLink 
                className="main-nav-item" 
                to="/" 
                onClick={handleSignOut}
              >
                <i className="fa fa-sign-out" aria-hidden="true" />
                {" "}Sign Out
              </NavLink>
            )}
          </>
        ) : (
          /* SINON (donc pas sur /profile) :
          Affiche "Sign In" avec l’icône user, qui mène vers la page de connexion */
          <NavLink 
            className="main-nav-item" 
            to="/login"
          >
            <i className="fa fa-user-circle" aria-hidden="true" />
            {" "}Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  // Si on est sur la page Home, on ne veut PAS que le <main> pousse le footer
  const isHome = pathname === "/";
  // Si je veux changer le bg sombre pour les pages que je souhaite
  const isDark = pathname === "/login" || pathname === "/profile"; 

  return (
    <>
      <Header />
      <main
        className={`main ${isDark ? "bg-dark" : ""}`}
        /**
        * → donc flex:0 (footer collé au contenu)
        *  Sinon flex:1 (footer reste en bas de page)
        */
        style={{ flex: isHome ? 0 : 1 }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

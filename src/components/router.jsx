import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route parent avec Header + Footer */}
        <Route path="/" element={<Layout />}>
          {/* Page d'accueil */}
          <Route index element={<Home />} />
          {/* Autres pages */}
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* 404 avec Header/Footer */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
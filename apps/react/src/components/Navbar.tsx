import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.scss";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;

    i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <button
        onClick={() => navigate("/")}
        style={{ background: "none", border: "none" }}
      >
        {t("appName")}
      </button>

      <div className="nav-right">
        <select
          value={i18n.language}
          onChange={changeLanguage}
          id="language-select"
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>

        {!user ? (
          <>
            <button aria-label="login" onClick={() => navigate("/login")}>{t("login")}</button>

            <button aria-label="signup" onClick={() => navigate("/signup")}>{t("signup")}</button>
          </>
        ) : (
          <>
            <button aria-label="create post" onClick={() => navigate("/post")}>{t("createPost")}</button>

            <button aria-label="logout" onClick={logout}>{t("logout")}</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

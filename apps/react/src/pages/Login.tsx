import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.scss";
import { useTranslation } from "react-i18next";

const Login = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch{
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{t("loginToContinue")}</h1>

        {error && <div role="alert" aria-live="polite" className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">{t("userName")}</label>
            <input
              id="username"
              name="username"
              placeholder={t("enterYourUserName")}
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder={t("enterYourPassword")}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" aria-label="Login to submit">
            {t("login")}
          </button>
        </form>

        <p className="footer-text">
          {t("dontHaveAccount")}
          <span onClick={() => navigate("/signup")}>{t("signup")}</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
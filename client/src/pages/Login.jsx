import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import getErrorMessage from "../utils/getErrorMessage.js";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // If ProtectedRoute sent us here, go back to the page they wanted
  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's own form submit/reload
    setError("");
    setSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <ErrorMessage message={error} />

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>

        <p className="form-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
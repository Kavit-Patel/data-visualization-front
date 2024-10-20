import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../api/api";
import { useQueryClient } from "react-query";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: login, isLoading } = useLogin();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [seePassword, setSeePassword] = useState(false);

  const handleUserDetails = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userDetails, {
      onSuccess: (data) => {
        if (data) {
          queryClient.setQueryData("user", data);
        }
      },
    }).then(() => navigate(`/?${urlParams}`));
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <section className="login-section">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-title">LogIn</div>

            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleUserDetails}
                className="login-input"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  onChange={handleUserDetails}
                  className="login-input password-input"
                  name="password"
                  type={seePassword ? "text" : "password"}
                  placeholder={
                    seePassword ? "enterpassword" : "*****************"
                  }
                />
                {seePassword ? (
                  <FaEye
                    onClick={() => setSeePassword(false)}
                    className="password-icon"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setSeePassword(true)}
                    className="password-icon"
                  />
                )}
              </div>
            </div>

            <div className="login-checkbox-group">
              <input
                className="checkbox"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <p>Remember me</p>
              <Link className="forgot-password" to="#">
                Forget Password
              </Link>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <div className="loading-dots">
                  <div className="dot"></div>
                  <div className="dot" style={{ animationDelay: "0.1s" }}></div>
                  <div className="dot" style={{ animationDelay: "0.2s" }}></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <Link to="/register" className="create-account-btn">
              Create Account
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

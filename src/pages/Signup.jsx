import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../api/api";
import "./Register.css"; // Include your CSS file here

const Register = () => {
  const { mutateAsync: register, isLoading } = useRegister();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [seePassword, setSeePassword] = useState({
    password: false,
    repeatPassword: false,
  });
  const [allowSubmit, setAllowSubmit] = useState(false);

  const handleUserDetails = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(
      { email: userDetails.email, password: userDetails.password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <section className="register-section">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-title">Register</div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleUserDetails}
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  onChange={handleUserDetails}
                  name="password"
                  type={seePassword.password ? "text" : "password"}
                  placeholder={
                    seePassword.password
                      ? "choosepassword"
                      : "*****************"
                  }
                />
                {seePassword.password ? (
                  <FaEye
                    onClick={() =>
                      setSeePassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    className="icon"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() =>
                      setSeePassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    className="icon"
                  />
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <div className="password-input">
                <input
                  onChange={handleUserDetails}
                  name="repeatPassword"
                  type={seePassword.repeatPassword ? "text" : "password"}
                  placeholder={
                    seePassword.repeatPassword
                      ? "repeatpassword"
                      : "*****************"
                  }
                />
                {seePassword.repeatPassword ? (
                  <FaEye
                    onClick={() =>
                      setSeePassword((prev) => ({
                        ...prev,
                        repeatPassword: !prev.repeatPassword,
                      }))
                    }
                    className="icon"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() =>
                      setSeePassword((prev) => ({
                        ...prev,
                        repeatPassword: !prev.repeatPassword,
                      }))
                    }
                    className="icon"
                  />
                )}
              </div>
            </div>

            <div className="checkbox-group">
              <input
                onClick={(e) => {
                  if (e.target instanceof HTMLInputElement) {
                    setAllowSubmit(e.target.checked);
                  }
                }}
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <p>
                I agree with{" "}
                <Link to="#" className="link">
                  Terms & Conditions
                </Link>
              </p>
            </div>

            <button
              type="submit"
              disabled={!allowSubmit}
              className={`submit-button ${allowSubmit ? "" : "disabled"}`}
            >
              {allowSubmit ? (
                isLoading ? (
                  <div className="loading-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                ) : (
                  "Create Account"
                )
              ) : (
                "Create Account"
              )}
            </button>

            <p className="login-link">
              Already have an account ?{" "}
              <Link className="link" to="/login">
                Login!
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;

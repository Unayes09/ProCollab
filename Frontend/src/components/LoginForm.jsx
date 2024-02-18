import React, { useState, useEffect } from "react";
import logincss from "./LoginForm.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar1 from "./Navbar1.jsx";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [UsernameData, setUsername] = useState();
  const [PasswordData, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);
  function routetohome() {
    navigate("/homepage");
  }
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(
          "http://localhost:8000/api/verify/" + token,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          routetohome();
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    console.log("Form data changed:", UsernameData);
  }, [UsernameData]);

  useEffect(() => {
    console.log("Form data changed:", PasswordData);
  }, [PasswordData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username: UsernameData,
        password: PasswordData,
      };
      let jsonData = "";
      await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          const token = data.token;
          localStorage.setItem("token", token);
          routetohome();
        } else {
          setLoginError(true);
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className={logincss.mainroot}>
        <Navbar1 />
        <div className={logincss.wrapper}>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {loginError && (
              <div className={logincss.additionalText}>
                <p
                  style={{ color: "red", fontSize: "12px", marginTop: "40px" }}
                >
                  Wrong username or password
                </p>
              </div>
            )}
            <div className={logincss.inputbox}>
              <input
                type="text"
                placeholder="Username"
                required
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaRegUserCircle className={logincss.icon} />
            </div>
            <div className={logincss.inputbox}>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <FaLock className={logincss.icon} />
            </div>
            <div className={logincss.rememberforgot}>
              <a href="/forgetpassword">Forgot password?</a>
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <div className={logincss.registerlink}>
              <p>
                Don't Have an account? <a href="/register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

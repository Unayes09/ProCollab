import React, { useState, useEffect } from "react";
import navbar from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let [user, setUser] = useState();

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        await fetch("https://procollab-backends.onrender.com/api/username/" + token, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (response) => {
          const data = await response.json();
          user = data.username;
          setUser(data.username);
        });
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkUsername();
  }, []);
  //const navigate = useNavigate()
  const buttonon = ()=>{
    navigate("/signin")
  }

  return (
    <>
      <nav className={navbar.navbar}>
        <div className={navbar.navbarleft}>
          <span className={navbar.logo}>ProCollab</span>
        </div>
        <div className={navbar.navbarright}>
          <a href="/profilepage">Profile</a>

          {user && (
            <a href={"https://procollab-backends.onrender.com/api/resource?user=" + user}>
              Resources
            </a>
          )}
          
          <a href="/Allchannels">Channels</a>
          <a href="/homepage">Projects</a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React, { useState, useEffect } from 'react';
import navbar from './Navbar.module.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate()
    let [user, setUser] = useState();
  function routetohome(){
    navigate('/signin')
  }
  useEffect(() => {
    const checkLoggedIn = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/api/verify/'+token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            });
            if (response.ok) {
                //routetohome()
            }
        } catch (error) {
            routetohome();
        }
    };

    checkLoggedIn();
}, []);
useEffect(() => {
    const checkUsername = async () => {
        try {
            const token = localStorage.getItem('token')
            await fetch('http://localhost:8000/api/username/'+token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            .then(async response => {
              const data = await response.json()
              user = data.username
              setUser(data.username)
          })
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    checkUsername();
}, []);

    return (
        <>
            
            <nav className={navbar.navbar}>
                <div className={navbar.navbarleft}>
                    <span className={navbar.logo}></span>
                </div>
                <div className={navbar.navbarright}>


                    <a href="/homepage">Profile</a>
                    <a href={"http://localhost:8000/api/resource?user="+user}>Resources</a>
                    <a href="/channels">Channels</a>
                    <a href="/Project">Projects</a>

                </div>
            </nav>

        </>
    )
}



export default Navbar
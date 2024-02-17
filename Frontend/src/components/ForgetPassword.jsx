import React, { useState, useEffect } from 'react';
import forgetcss from './ForgetPassword.module.css'

import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {

    const navigate = useNavigate()
    const [EmailData, setEmail] = useState()
    const [loginError, setLoginError] = useState(false);
    const [login2Error, setLogin2Error] = useState(false);
    function routetohome() {
        navigate('/signin')
    }
    function routetohome2() {
        navigate('/homepage')
    }
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log(token)
                const response = await fetch('http://localhost:8000/api/verify/'+token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
                if (response.ok) {
                    routetohome2()
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoggedIn();
    }, []);

    useEffect(() => {
        console.log('Form data changed:', EmailData);
    }, [EmailData]);

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                email: EmailData,
                 
            }
            
            await fetch('http://localhost:8000/auth/forget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            .then(response => {
                const data = response.json()
                if (response.ok) {
                    setLoginError(true)
                    console.log(response.status)
                }
                else {
                    setLogin2Error(true)
                }
                
            })
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <>
            <div className={forgetcss.mainroot}>
            <Navbar />
            <div className={forgetcss.wrapper}>
                <form onSubmit={handleSubmit}>
                        <h1>Recover Password</h1>
                        {loginError &&<div className={forgetcss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                Please check your email.
                            </p>
                        </div>}
                        {login2Error &&<div className={forgetcss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                User not registered!
                            </p>
                        </div>}
                    <div className={forgetcss.inputbox}>
                        <input type="email" placeholder='Email' required name="email" onChange={(e) => setEmail(e.target.value)} />
                        
                    
                    <button type="submit" onClick={handleSubmit}>Send Password</button>
                    </div>
                </form>

            </div>
            </div>
        </>
    );
}

export default ForgetPassword;
import React, { useState, useEffect } from 'react';
import forgetcss from './ForgetPassword.module.css'

import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from './Navbar.jsx';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {

    const navigate = useNavigate()
    const [EmailData, setEmail] = useState()
    
    function routetohome() {
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
                    routetohome()
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
                routetohome()
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

export default LoginForm;
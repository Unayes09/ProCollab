import React, { useState, useEffect } from 'react';
import logincss from './ForgetPassword.module.css'

import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Navbar from './Navbar';

const ForgetPassword = () => {


        const [UsernameData, setUsername] = useState()
        const [PasswordData,setPassword]=useState()

        useEffect(() => {
            console.log('Form data changed:', UsernameData);
        }, [UsernameData]);

        useEffect(() => {
            console.log('Form data changed:', PasswordData);
        }, [PasswordData]);

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                //console.log('Form data submitted:', formData);
                const formData = {
                    username: UsernameData,
                    password: PasswordData
                }
                let jsonData = "";
                const response = await fetch('http://localhost:8000/auth/login', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                    
                });
                jsonData = await response.json()
                if (response.ok) {
                    console.log(jsonData)
                } else {
                    console.log(jsonData)
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };


    return (
        <>
            <Navbar/>
            <div className={logincss.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className={logincss.inputbox}>
                        <input type="text" placeholder='Username' required name="Username" onChange={(e)=>setUsername(e.target.value)}/>
                        <FaRegUserCircle className={logincss.icon} />
                    </div>
                    <div className={logincss.inputbox}>
                        <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
                        
                        <FaLock className={logincss.icon} />
                    </div>
                    <div className={logincss.rememberforgot}>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type="submit"><a href='/ProfilePage' className={logincss.loginbutton}>Login</a></button>
                    <div className={logincss.registerlink}>
                        <p>Don't Have an account? <a href='RegisterForm'>Register</a></p>
                    </div>
                </form>
           
            </div>
            </>
        );
    }

export default ForgetPassword;
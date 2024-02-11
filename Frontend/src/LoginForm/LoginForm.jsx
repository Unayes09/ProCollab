import React, { useState, useEffect } from 'react';
import './LoginForm.css'
import './LoginForm2.css'
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {


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
                const response = await fetch('http//localhost:8000/auth/login', {
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
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required name="Username" onChange={(e)=>setUsername(e.target.value)}/>
                        <FaRegUserCircle className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
                        
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't Have an account? <a href='#'>Register</a></p>
                    </div>
                </form>
           
            </div>
        );
    }

export default LoginForm;
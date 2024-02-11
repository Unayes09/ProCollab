import React, { useState, useEffect } from 'react';
import './LoginForm.css'
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {


        // const [formData, setFormData] = useState({
        //     Username: '',
        //     Password: ''

        // });
        const [UsernameData, setUsername] = useState()
        const [PasswordData,setPassword]=useState()

        useEffect(() => {
            // This effect runs when formData changes
            console.log('Form data changed:', UsernameData);
        }, [UsernameData]);
        useEffect(() => {
            // This effect runs when formData changes
            console.log('Form data changed:', PasswordData);
        }, [PasswordData]);

    //     const handleChange = (e) => {
    //         // Update formData when inputs change
    //         setFormData({ ...formData, [e.target.Username]: e.target.value });
    // };
    //     const handleChange2 = (e) => {
    //         // Update formData when inputs change
    //         setFormData({ ...formData, [e.target.Password]: e.target.value });
    //     };

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

                if (response.ok) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };


        return (
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <h4>{UsernameData}</h4>
                    <h4>{PasswordData}</h4>
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
                    <button type="submit" onSubmit={handleSubmit}>Login</button>
                    <div className="register-link">
                        <p>Don't Have an account? <a href='#'>Register</a></p>
                    </div>
                </form>
           
            </div>
        );
    }

export default LoginForm;
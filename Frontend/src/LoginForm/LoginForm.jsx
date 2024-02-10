import React from 'react';
import './LoginForm.css'
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaRegUserCircle className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon'/>
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
};

export default LoginForm;
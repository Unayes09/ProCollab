import React from 'react'
import logo from './assets/react.svg'
import './App.css'

const Navbar = () => {
    
    return (
            <nav className="navbar">
                <h2 className='logotext'><span>ProCollab</span></h2>
                <ul className='menu-link'> 
                    <li className="nav-item"><a href="">Sign in</a></li>
                    <li className="nav-item"><a href="">About us</a></li>
                    <li className="nav-item"><a href="">Faq</a></li>
                </ul>
            </nav>
  )
}

export default Navbar
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Correct import
import Navbar from './components/Navbar.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';

const router = createBrowserRouter([{
  path: '/',
  element: <LoginForm />,
  }, {
  path: '/RegisterForm',
    element:<RegisterForm/>,
  }, 
  {
  path: '/ProfilePage',
    element:<ProfilePage/>,
  }, 
]);

ReactDOM.render(
  <React.StrictMode> {/* Correct JSX syntax */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
  document.getElementById('root')
);
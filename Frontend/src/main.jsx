import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Firstpage from './components/Firstpage.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Home from './components/Home.jsx';
import ChatBox from './components/ChatBox.jsx';
import CreateProject from './components/CreateProject';
import ProfilePage from './components/ProfilePage';
import ProjectPage from './components/ProjectPage';


const router = createBrowserRouter([
  {
    path: '/',
    element:<Firstpage/>
  },
  {
    path: '/homepage',
    element: <Home/>,
},
  {
  path: '/signin',
  element: <LoginForm />,
  }, {
    path: '/register',
    element:<RegisterForm/>,
  },
  {
    path: '/chatbox',
    element:<ChatBox/>,
  },
  {
    path: '/createproject',
    element:<CreateProject/>,
  },
  {
    path: '/profilepage',
    element:<ProfilePage/>,
  },
  {
    path: '/projectpage',
    element:<ProjectPage/>,
  },
  
]);

ReactDOM.render(
  <React.StrictMode> {/* Correct JSX syntax */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
  document.getElementById('root')
);
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Firstpage from "./components/Firstpage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Home from "./components/Home.jsx";
import ChatBox from "./components/ChatBox.jsx";
import CreateProject from "./components/CreateProject";
import ProfilePage from "./components/ProfilePage";
import ProjectPage from "./components/ProjectPage";
import ForgetPassword from "./components/ForgetPassword";
import Allchannels from "./components/Allchannels.jsx";
import ChangePassword from "./components/ChangePassword";
import CreateChannel from "./components/CreateChannel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Firstpage />,
  },
  {
    path: "/homepage",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/chatbox",
    element: <ChatBox />,
  },
  {
    path: "/createproject",
    element: <CreateProject />,
  },
  {
    path: "/profilepage",
    element: <ProfilePage />,
  },
  {
    path: "/projectpage",
    element: <ProjectPage />,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword />,
  },
  {
    path: "/Allchannels",
    element: <Allchannels />,
  },
  {
    path: "/changepassword",
    element: <ChangePassword />,
  },
  {
    path: "/createchannel",
    element: <CreateChannel />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    {" "}
    {/* Correct JSX syntax */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// component
import NavBar from "./Components/NavBar.jsx";
// pages
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NewProject from "./pages/NewProject.jsx";
import NewPledge from "./pages/NewPledge.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/signup", element: <Signup /> },
      { path: "/project", element: <NewProject /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/pledges/:id", element: <NewPledge /> },
    ],
  },
  // don't need a nav
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

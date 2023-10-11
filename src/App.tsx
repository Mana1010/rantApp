import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import Info from "./Info";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Newsfeed from "./pages/Newsfeed";
import { authen } from "./auth/auth";
import Layout from "./forms/Layout";
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "form",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence onExitComplete={() => null}>
      <RouterProvider router={router} key={location.pathname} />
    </AnimatePresence>
  );
}

export default App;

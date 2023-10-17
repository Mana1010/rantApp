import React from "react";
import Layout from "./forms/Layout";
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CustomizeProfile from "./forms/CustomizeProfile";
import Newsfeed from "./pages/Newsfeed";
function AnimatePres() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Layout />}>
          <Route index element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="customizeProfile" element={<CustomizeProfile />} />
        <Route path="newsfeed" element={<Newsfeed />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatePres;

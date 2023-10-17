import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import Info from "./Info";
import { useLocation, BrowserRouter } from "react-router-dom";
import AnimatePres from "./AnimatePres";
function App() {
  return (
    <BrowserRouter>
      <AnimatePres />
    </BrowserRouter>
  );
}

export default App;

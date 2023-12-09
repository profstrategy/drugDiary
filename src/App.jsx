import React from "react";
import {Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Info from "./Info";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  )

}

export default App

import { Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "../(pages)/admin/dashboard/page.jsx";

//! Agregar las demas rutas

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
}

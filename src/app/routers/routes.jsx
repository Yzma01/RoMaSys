import { Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "../(pages)/admin/dashboard/page.jsx";
import AddClient from "../(pages)/admin/addClient/page.jsx";
import Reports from "../(pages)/admin/reports/page.jsx";

//! Agregar las demas rutas

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/addClient" element={<AddClient />} />
      <Route path="/admin/reports" element={<Reports />} />
    </Routes>
  );
}

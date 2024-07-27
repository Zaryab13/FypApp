import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";
import SDGs from "./pages/SDGs";
import ViewPatient from "./pages/ViewPatient";
import AdminDashboard from "./pages/AdminDashboard";

import PageLayout from "./components/PageLayout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/objectives" element={<SDGs />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<PageLayout sidebar />}>
        <Route element={<RequireAuth allowedRole="technician" />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/patients-manage" element={<Patients />} />
          <Route path="patients-manage/view" element={<ViewPatient />} />
        </Route>
        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Route>  

      {/* Catch All Path */}
      <Route
        path="*"
        element={
          <PageLayout>
            <Home />
          </PageLayout>
        }
      />
    </Routes>
  );
}

export default App;

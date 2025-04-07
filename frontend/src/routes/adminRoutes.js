import React from "react";
import MainLayout from "../layout/MainLayout";
import { privateRoutes } from "./privateRoutes"; // Ensure privateRoutes is defined

export const adminRoutes = [
    {
        path: "/admin-dashboard",
        element: <MainLayout />, // MainLayout wraps AdminDashboard
        role: "admin",
        children: privateRoutes, // Use privateRoutes directly
    }
];

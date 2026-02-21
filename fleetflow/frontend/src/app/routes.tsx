import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { DashboardPage } from "./pages/DashboardPage";
import { InventoryPage } from "./pages/InventoryPage";
import { TripsPage } from "./pages/TripsPage";
import { TripCreatePage } from "./pages/TripCreatePage";
import { MaintenancePage } from "./pages/MaintenancePage";
import { ExpensesPage } from "./pages/ExpensesPage";
import { DriversPage } from "./pages/DriversPage";
import { DriversCompliancePage } from "./pages/DriversCompliancePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "FINANCIAL_ANALYST"]}>
            <DashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: "inventory",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "DISPATCHER", "SAFETY_OFFICER"]}>
            <InventoryPage />
          </RoleGuard>
        ),
      },
      {
        path: "trips",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "DISPATCHER"]}>
            <TripsPage />
          </RoleGuard>
        ),
      },
      {
        path: "trips/create",
        element: (
          <RoleGuard allowedRoles={["DISPATCHER", "MANAGER"]}>
            <TripCreatePage />
          </RoleGuard>
        ),
      },
      {
        path: "maintenance",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "SAFETY_OFFICER"]}>
            <MaintenancePage />
          </RoleGuard>
        ),
      },
      {
        path: "expenses",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "DISPATCHER", "FINANCIAL_ANALYST"]}>
            <ExpensesPage />
          </RoleGuard>
        ),
      },
      {
        path: "drivers",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "SAFETY_OFFICER"]}>
            <DriversPage />
          </RoleGuard>
        ),
      },
      {
        path: "drivers/compliance",
        element: (
          <RoleGuard allowedRoles={["SAFETY_OFFICER", "MANAGER"]}>
            <DriversCompliancePage />
          </RoleGuard>
        ),
      },
      {
        path: "analytics",
        element: (
          <RoleGuard allowedRoles={["MANAGER", "FINANCIAL_ANALYST"]}>
            <AnalyticsPage />
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
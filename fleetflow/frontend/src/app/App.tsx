import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { FleetDataProvider } from "./context/FleetDataContext";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <FleetDataProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
              },
            }}
          />
        </FleetDataProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
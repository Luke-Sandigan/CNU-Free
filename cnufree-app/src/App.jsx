import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppLayout from "./layouts/app-layout.jsx";
import "./App.css";
import SharedTracker from "./pages/SharedTracker.jsx";
import Connection from "./pages/Connection.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import { ToastProvider } from "./context/ToastContext";
// import FriendSchedule from "./pages/FriendSchedule.jsx";
// import VerificationPage from "./pages/VerificationPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
      {
        path: "/SignInPage",
        element: (
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        ),
      },
      // {
      //   path: "/VerificationPage",
      //   element: (
      //     <PublicRoute>
      //       <VerificationPage />
      //     </PublicRoute>
      //   ),
      // },
      {
        path: "/auth/callback",
        element: <AuthCallback />,
      },
      {
        path: "/Onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/SharedTracker",
        element: (
          <ProtectedRoute>
            <SharedTracker />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Connection",
        element: (
          <ProtectedRoute>
            <Connection />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;

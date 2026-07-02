import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import Onboarding from "./pages/Onboarding.jsx";
import HomePage from './pages/HomePage.jsx';
import AppLayout from './layouts/app-layout.jsx';
import './App.css';
import SharedTracker from "./pages/SharedTracker.jsx";
import Connection from "./pages/Connection.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import { ToastProvider } from "./context/ToastContext";
// import FriendSchedule from "./pages/FriendSchedule.jsx";
// import VerificationPage from './pages/VerificationPage.jsx';

  
const router = createBrowserRouter([ 
  { 
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element:  <LandingPage />
      },
      {
        path: '/SignInPage',
        element:  <SignInPage />
      },
      {
        path: '/Auth/callback',
        element: <AuthCallback/>
      },
      {
        path: '/Onboarding',
        element: <Onboarding/> 
      },
      {
        path: '/Home',
        element: <HomePage/>
      },
      {
        path: '/SharedTracker',
        element: <SharedTracker/>
      },
      {
        path: '/Connection',
        element: <Connection/>
      },
    ]

  }
])

function App() {


  return (
   <ToastProvider>
    <RouterProvider router={router} />
   </ToastProvider>
    
    
  );
} 

export default App
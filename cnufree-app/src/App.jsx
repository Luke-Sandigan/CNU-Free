import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
// import VerificationPage from './pages/VerificationPage.jsx';
// import Onboarding from "./pages/Onboarding.jsx";
import HomePage from './pages/HomePage.jsx';
import AppLayout from './layouts/app-layout.jsx';
import './App.css';
import SharedTracker from "./pages/SharedTracker.jsx";
import Connection from "./pages/Connection.jsx";


  
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
      // {
      //   path: '/Onboarding',
      //   element: <Onboarding/> 
      // },
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
      }
    ]

  }
])

function App() {


  return (
    <RouterProvider router={router} />
    
  );
} 

export default App
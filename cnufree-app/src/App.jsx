import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
// import VerificationPage from './pages/VerificationPage.jsx';
// import Onboarding from "./pages/Onboarding.jsx";
import HomePage from './pages/HomePage.jsx';
import AppLayout from './layouts/app-layout.jsx';
import './App.css';

  
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
        element: <HomePage />
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

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazyWithPreload } from 'react-lazy-with-preload';
import NavbarComponent from './components/navbar/navbarComponent.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegistrationPage from '.Pages/RegistrationPage';

const OmOss = lazyWithPreload(() => import("./Pages/OmOss.jsx"));
const Inställningar = lazy(() => import("./Pages/Inställningar.jsx"));
const GymInfo = lazyWithPreload(() => import('./components/gymInfo/gymInfo.jsx'));
const Registration = lazyWithPreload(() => import("./Pages/RegistrationPage.jsx"));
const StartPage = lazy(() => import('./Pages/StartPage.jsx'));
const NotesPage = lazy(() => import('./Pages/NotesPage.jsx'));
const MyAccount = lazy(() => import('./Pages/MyAccount.jsx'));


import { useEffect } from 'react';

function App() {
  useEffect(() => {
    Registration.preload();
  }, []);

  return (
    <Router>
      <NavbarComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/about" element={<OmOss />} />
          <Route path="/settings" element={<Inställningar />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/gyminfo" element={<GymInfo />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

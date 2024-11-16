
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazyWithPreload } from 'react-lazy-with-preload';
import NavbarComponent from './components/navbar/NavbarComponent.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Registration = lazyWithPreload(() => import("./pages/Registration"));
const OmOss = lazyWithPreload(() => import("./pages/OmOss"));
const Inställningar = lazy(() => import("./pages/Inställningar"));
const GymInfo = lazyWithPreload(() => import('./components/gymInfo/gymInfo.jsx'));
const StartPage = lazy(() => import('./pages/StartPage.jsx'));
const NotesPage = lazy(() => import('./pages/NotesPage.jsx'));
const MyAccount = lazy(() => import('./Pages/MyAccount'));


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
          <Route path="/registration" element={<Registration />} />
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

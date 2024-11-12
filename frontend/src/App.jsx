
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import OmOss from "./pages/OmOss";
import Inställningar from "./pages/Inställningar";
import GymInfo from './components/gymInfo/gymInfo.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css";
import StartPage from './pages/StartPage.jsx';
import Footer from './components/footer/footer.jsx';
import NotesPage from './pages/NotesPage.jsx';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
      <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<OmOss />} />
        <Route path="/settings" element={<Inställningar />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gyminfo" element={<GymInfo />} />
        <Route path="/notes" element={<NotesPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

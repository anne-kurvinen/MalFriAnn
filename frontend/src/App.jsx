
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import OmOss from "./pages/OmOss";
import Inställningar from "./pages/Inställningar";
import LoggaIn from "./pages/LoggaIn";
import GymInfo from './components/gymInfo/gymInfo.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css";
import StartPage from './pages/StartPage.jsx';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
      <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<OmOss />} />
        <Route path="/settings" element={<Inställningar />} />
        <Route path="/login" element={<LoggaIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gyminfo" element={<GymInfo />} />
      </Routes>
    </Router>
  );
}

export default App;

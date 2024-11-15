import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import "./LoginModal.css";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onRequestClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true); 


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Spara token i localStorage

        setEmail("");
        setPassword("");
        setError("");
        onLoginSuccess();
        onRequestClose();
        navigate("/"); // Navigera till startsidan
      } else {
        setError(data.message);
      }
    } catch {
      setError("Något gick fel. Försök igen senare.");
    }
  };

  
  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setError("");
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logga In"
      className="modal-lay"
      overlayClassName="modal-overlay"
    >
      <h3 className="login-rubrik">Logga In</h3>
      <form className="modal-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label className="modal-label" htmlFor="email">Email:</label>
          <input
            className="modal-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="modal-label" htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              className="modal-input"
              type={showPassword ? "password" : "text"} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword(!showPassword)} 
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
        </div>

        <p className="modal-text">
          {" "}
          Har du inget medlemskonto?{" "}
          <Link to="/registration" className="modal-text" onClick={onRequestClose}>
            Registrera dig här
          </Link>{" "}
        </p>
        <div>
          <button className="modalbutton" type="button" onClick={handleCancel}>
            Ångra
          </button>
          <button className="modalbutton" type="submit">
            Logga In
          </button>
        </div>
        <p className="modal-text"> Har du glömt ditt lösenord? </p>
        <button
          className="modalbutton"
          type="button"
          onClick={() => {
            const email = prompt("Ange din e-mailadress:");
            if (email) {
              console.log("Återställningslänk skickad till:", email);
              alert(
                "En återställningslänk har skickats till din e-mailadress."
              );
            }
          }}
        >
          Nytt Lösenord
        </button>
      </form>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginModal;

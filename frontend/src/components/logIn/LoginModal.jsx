import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./LoginModal.css"; // Importera CSS-filen

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hantera inloggning här
    console.log("Inloggning:", { email, password });
    setEmail("");
    setPassword("");
    onRequestClose();
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logga In"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Logga In</h2>
      <p className="contentLabel">
        {" "}
        Har du inget medlemskonto?{" "}
        <Link to="/registration" onClick={onRequestClose}>
          Registrera dig här
        </Link>{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button className="modalbutton" type="button" onClick={handleCancel}>
            Ångra
          </button>
          <button className="modalbutton" type="submit">
            Logga In
          </button>

          <p className="contentLabel">
            {" "}
            Har du glömt ditt lösenord?? Be om ett nytt lösenord här
          </p>
          <button
            className="modalbutton"
            type="button"
            onClick={() => {
              const email = prompt(
                "Ange din emailadress för att återställa lösenordet:"
              );
              if (email) {
                alert(`En återställningslänk har skickats till ${email}`);
              }
            }}
          >
            Nytt Lösenordet
          </button>
        </div>
      </form>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default LoginModal;

import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './LoginModal.css'; 

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onRequestClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hantera inloggning här
    console.log('Inloggning:', { email, password });
    setEmail('');
    setPassword('');
    onLoginSuccess();
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    onRequestClose();
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
        <p className="contentLabel"> Har du inget medlemskonto? <Link to="/registration" onClick={onRequestClose}>Registrera dig här</Link> </p>
        <div>
          <button className="modalbutton" type="button" onClick={handleCancel}>Ångra</button>
          <button className="modalbutton" type="submit">Logga In</button>
          <button className="modalbutton" type="button">Glömt Lösenordet</button>
        </div>
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
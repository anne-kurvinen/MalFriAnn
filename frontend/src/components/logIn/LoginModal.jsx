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
  
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logga In"
      className="modal-lay"
      overlayClassName="modal-overlay"
    >
      <h3 className='login-rubrik'>Logga In</h3>
      <form className='modal-form' onSubmit={handleSubmit}>
        <div>
          <label className='modal-label' htmlFor="email">Email:</label>
          <input className='modal-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='modal-label' htmlFor="password">Password:</label>
          <input className='modal-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="modal-text"> Har du inget medlemskonto? <Link to="/registration" className='modal-text' onClick={onRequestClose}>Registrera dig här</Link> </p>
        <div>
          <button className="modalbutton" type="button" onClick={handleCancel}>Ångra</button>
          <button className="modalbutton" type="submit">Logga In</button>

        <p className="modal-text"> Har du glömt ditt lösenord? </p>
        
          <button className="modalbutton" type="button" onClick={() => {
          const email = prompt('Ange din e-mailadress:');
          if (email) {
            console.log('Återställningslänk skickad till:', email);
            alert('En återställningslänk har skickats till din e-mailadress.');
          }
          }}>Nytt Lösenord</button>
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
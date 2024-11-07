import { useState } from 'react';
import './Registration-style.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    personalId: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte.");
      return false;
    }

    // Lägg till validering här för e-post och personnummer om det behövs

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    // Simulera registrering utan backend
    setTimeout(() => {
      console.log('Simulerad registrering med data:', formData);
      setLoading(false);
      setSuccess(true); // Visa bekräftelsemeddelandet
    }, 1000);
  };

  // Funktion för att stänga popupen
  const closePopup = () => {
    setSuccess(false); // Stänger popupen när användaren klickar på "OK"
  };

  return (
    <div className="registration-container">
      <h1>Registrera konto</h1>
      {error && <div className="error-message">{error}</div>}

      {/* Popup när registreringen lyckas */}
      {success && (
        <div className="popup">
          <div className="popup-content">
            <p className="popup-message">Registrering lyckades!</p>
            <button className="close-popup" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Förnamn:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Efternamn:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Personnummer:</label>
          <input
            type="text"
            name="personalId"
            value={formData.personalId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adress:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefonnummer:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bekräfta lösenord:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registrerar...' : 'Registrera konto'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
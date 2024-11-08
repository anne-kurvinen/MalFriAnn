import { useState } from 'react';
import MembershipComponent  from '../components/membership/membershipComponent.jsx';
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

  const [selectedMembership, setSelectedMembership] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTermsChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte.");
      return false;
    }
    if (!acceptedTerms) {
      setError("Du måste godkänna användarvillkoren");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    setSuccess(false);

    setTimeout(() => {
      console.log('Simulerad registrering med data:', formData, 'Medlemskap:', selectedMembership);
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const closePopup = () => {
    setSuccess(false);
  };

  return (
    <div className="registration-container">
      <h1>Registrering av konto</h1>
      {error && <div className="error-message">{error}</div>}

      {success && (
        <div className="popup">
          <div className="popup-content">
            <p className="popup-message">Registrering lyckades!</p>
            <button className="close-popup" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

<MembershipComponent onSelectMembership={setSelectedMembership} />

{selectedMembership && (
  <div className="selected-membership-container">
    <p>
      Du har valt: <strong>{selectedMembership.name}</strong> - <span className="price">{selectedMembership.price}</span>
    </p>
  </div>
)}

<h2 className="personuppgifter-heading">Skriv in dina personuppgifter</h2>

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
        
        {/* Terms and Conditions Checkbox */}
        <div className="terms-container">
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={handleTermsChange}
            required
          />
            Jag godkänner <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">medlemsvillkoren</a>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrerar...' : 'Registrera konto'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
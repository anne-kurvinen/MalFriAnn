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
  const [showTermsModal, setShowTermsModal] = useState(false)

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

  const openTermsModal = () => {
    setShowTermsModal(true);
  }

  const closeTermsModal = () => {
    setShowTermsModal(false);
  }

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
            Jag godkänner{ ' ' }
          <span onClick={openTermsModal} className="terms-link">
            medlemsvillkoren
          </span>
          </label>
        </div>

        <button className="registration-btn" type="submit" disabled={loading}>
          {loading ? 'Registrerar...' : 'Registrera konto'}
        </button>
      </form>

      {showTermsModal && (
        <div className="modal-overlay">
  <div className="modal-content">
    <h2>Medlemsvillkor och GDPR</h2>
    <p>
      Genom att registrera dig hos MalFriAnn godkänner du att vi behandlar dina
      personuppgifter enligt Dataskyddsförordningen (GDPR). Vi värnar om din
      integritet och säkerheten för dina uppgifter, och vi strävar efter att
      ge dig full insyn i hur vi hanterar dessa uppgifter.
    </p>
    <p>
      <br />
      <strong>Vilka uppgifter samlar vi in?</strong>
      <br />
      Vi samlar in namn, kontaktuppgifter (e-post och telefonnummer),
      personnummer, betalningsinformation och träningshistorik för att kunna
      erbjuda våra tjänster och anpassa ditt medlemskap.
    </p>
    <p>
      <br />
      <strong>Hur används dina personuppgifter?</strong>
      <br />
      Dina uppgifter används för att skapa och hantera ditt medlemskonto,
      säkerställa en trygg och anpassad träningsupplevelse, ge information om
      medlemskap, hantera betalningar och förbättra våra tjänster.
    </p>
    <p>
      <br /> 
      <strong>Hur lagrar och skyddar vi dina uppgifter?</strong>
      <br />
      Ditt data lagras säkert och är endast åtkomligt för behörig personal.
      Vi använder industristandarder för att skydda din information mot
      obehörig åtkomst och spridning.
    </p>
    <p>
      <br />
      <strong>Delning av personuppgifter</strong>
      <br />
      Vi delar inte dina uppgifter med tredje part, förutom när det krävs
      enligt lag eller med betrodda tjänsteleverantörer för att kunna erbjuda
      våra tjänster (t.ex. för betalningshantering). Dessa är skyldiga att
      följa GDPR och får inte använda dina uppgifter för andra ändamål.
    </p>
    <p>
      <br />
      <strong>Dina rättigheter</strong>
      <br />
      Du har rätt att begära tillgång till, rätta, radera, begränsa och
      invända mot behandlingen av dina personuppgifter. Kontakta oss gärna på
      <em> MalFriAnn@gym.com</em> för frågor eller för att utöva dina rättigheter.
    </p>
    <p>
      Genom att klicka på &quot;Jag godkänner medlemsvillkoren&quot; bekräftar du att du har läst och
      förstått våra villkor för behandling av personuppgifter och samtycker
      till att dina uppgifter behandlas enligt beskrivningen ovan.
    </p>
    <button onClick={closeTermsModal} className="close-modal-btn">
      Stäng
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default RegistrationPage;
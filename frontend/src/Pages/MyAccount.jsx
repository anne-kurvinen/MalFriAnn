import React, { useState, useEffect } from 'react';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    personalId: '', // visas men kan inte ändras
    address: '',
    postcode: '',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Hämta användarens nuvarande uppgifter från backend och fylla i formData.

    // Simulerad hämtning av data:
    const userData = {
      firstName: 'Exempel',
      lastName: 'Användare',
      email: 'exempel@anvandare.com',
      personalId: '123456-7890', // Personnummer ska visas men inte vara redigerbart
      address: 'Exempelgatan 1',
      postcode: '430 11',
      phoneNumber: '0701234567',
      password: '', // Lämna lösenordet tomt för säkerhet
    };
    setFormData(userData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Skicka uppdaterade data till servern
    setTimeout(() => {
      console.log('Profilen uppdaterades med data:', formData);
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const closePopup = () => {
    setSuccess(false);
  };

  return (
    <div className="edit-profile-container">
      <h1>Redigera profil</h1>
      {error && <div className="error-message">{error}</div>}

      {success && (
        <div className="popup-updated">
          <div className="popup-content-updated">
            <p className="popup-message-updated">Profilen uppdaterades!</p>
            <button className="close-popup-updated" onClick={closePopup}>OK</button>
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
            readOnly // Fältet är skrivskyddat
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
          <label>Postkod:</label>
          <input
            type="text"
            name="address"
            value={formData.postcode}
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
          <label>Nytt lösenord:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className="update-btn" type="submit" disabled={loading}>
          {loading ? 'Uppdaterar...' : 'Uppdatera profil'}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
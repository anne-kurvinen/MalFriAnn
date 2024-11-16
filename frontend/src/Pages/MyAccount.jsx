import { useState, useEffect } from 'react';
import './MyAccount.css';
import axios from 'axios';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    personalId: '', // Read-only
    address: '',
    postcode: '',
    city: '',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
  
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 
  
        if (!token) {
          setError('Ingen giltig token hittades. Logga in igen.');
          return;
        }
  
        // Send token in Authorization header
        const response = await axios.get('/api/myaccount', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

  
        if (response.data && response.data.firstname) {
          setFormData({
            firstName: response.data.firstname,  
            lastName: response.data.lastname,    
            email: response.data.email,
            personalId: response.data.personalid, 
            address: response.data.address,
            postcode: response.data.postcode,
            city: response.data.city,
            phoneNumber: response.data.phonenumber, 
            password: '',  
          });
        } else {
          setError('Ingen användardata hittades.');
        }
      } catch {
        setError('Det gick inte att hämta användardata');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
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

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setError('Ingen giltig token hittades. Logga in igen.');
        return;
      }

      // Send token in Authorization header for profile update
      const response = await axios.put('/api/myaccount', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer token
        },
      });

      setSuccess(true);
      console.log('Profilen uppdaterades:', response.data);
      setSuccessMessage('Dina ändringar har uppdaterats!');
    } catch {
      setError('Det gick inte att uppdatera din profil');
    } finally {
      setLoading(false);
    }
  };

  // Delete user profile
  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setError('Ingen giltig token hittades. Logga in igen.');
        return;
      }

      // Send token in Authorization header for deleting the profile
      await axios.delete('/api/myaccount', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer token
        },
      });

      console.log('Profil raderad');
      localStorage.removeItem('token'); // Remove token from localStorage
      window.alert('Ditt konto har raderats.');
      window.location.href = '/'; // Redirect to home page
    } catch {
      console.error('Det gick inte att radera profilen');
      setError('Det gick inte att radera profilen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
{success && (
  <div className="popup-sucess">
    <div className="popup-content-sucess">
      <p className="popup-message-sucess">{successMessage || 'Dina ändringar har uppdaterats!'}</p>
      <button className="close-popup-sucess" onClick={() => setSuccess(false)}>
        OK
      </button>
    </div>
  </div>
)}


      <h1 className="edit-profile-h1">Redigera profil</h1>
      <div className="edit-profile-container">
        {error && <div className="error-message">{error}</div>}
  
        {success && (
          <div className="popup-updated">
            <div className="popup-content-updated">
              <p className="popup-message-updated">Profilen uppdaterades!</p>
              
            </div>
          </div>
        )}
  
        {/* Only render the form if formData is valid */}
        {formData && formData.firstName && formData.lastName && formData.email ? (
          <form className="edit-profile-form" onSubmit={handleSubmit}>
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
              <div className="input-container">
                <i className="fas fa-lock lock-icon"></i> {/* Låsikon */}
                <input
                  type="text"
                  name="personalId"
                  value={formData.personalId}
                  readOnly // Read-only field
                />
              </div>
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
              <label>Postnummer:</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stad:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
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
            <div className="button-container">
              <button className="update-btn" type="submit" disabled={loading}>
                {loading ? 'Uppdaterar...' : 'Uppdatera profil'}
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Radera profil
              </button>
            </div>
          </form>
        ) : (
          <div className="error-message">Ingen användardata hittades.</div>
        )}
      </div>
  
      {showDeleteModal && (
        <div className="modal-overlay-delete">
          <div className="modal-delete">
            <p>Är du säker på att du vill radera din profil?</p>
            <button className="confirm-btn" onClick={handleDelete}>Ja</button>
            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Nej</button>
          </div>
        </div>
      )}
    </>
  );
}
export default EditProfilePage;
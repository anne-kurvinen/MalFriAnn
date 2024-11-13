import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 


const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/membership-categories');
    return response.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const MembershipComponent = ({ onSelectMembership }) => {
  const [categories, setCategories] = useState([]); 

  
  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories); 
    };

    loadCategories();
  }, []); 

  const handleMembershipSelect = (membership) => {
    if (onSelectMembership) {
      onSelectMembership(membership); 
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Välj ett medlemskap:</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {categories.map((membership) => (
          <div key={membership.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: 'rgb(222, 222, 22)' }}>{membership.title}</h3>
            <p><strong>Pris:</strong> {membership.price} SEK/month</p>
            <ul>
              <li>{membership.description}</li>
            </ul>
            <button
              onClick={() => handleMembershipSelect(membership)}
              style={{
                backgroundColor: 'rgb(222, 222, 22)',
                color: 'black',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Välj {membership.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


MembershipComponent.propTypes = {
  onSelectMembership: PropTypes.func.isRequired, 
};

export default MembershipComponent;

import { useState } from 'react';

// Ditt medlemskapsalternativ
const ChooseMemberships = [
  {
    id: 1,
    name: 'Basic',
    price: '199 SEK/month',
    benefits: ['Tillgång till gym', '1 gästpass per månad', 'Möjlighet att köpa till klasser'],
  },
  {
    id: 2,
    name: 'Premium',
    price: '399 SEK/month',
    benefits: ['Tillgång till gym', 'Obegränsad tillgång till klasser', '3 gästpass per månad'],
  },
  {
    id: 3,
    name: 'VIP',
    price: '699 SEK/month',
    benefits: ['Tillgång till gym 24/7 ', 'Personlig tränare', 'Obegränsad tillgång till gästpass'],
  },
];

// Funktion för att välja medlemskap 
const MembershipComponent = ({ onSelectMembership }) => {
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleMembershipSelect = (membership) => {
    setSelectedMembership(membership);
    if (onSelectMembership) {
      onSelectMembership(membership); // Skickar tillbaka den valda medlemskap till föräldern
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Välj ett medlemskap:</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {ChooseMemberships.map((membership) => (
          <div key={membership.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: 'rgb(222, 222, 22)' }}>{membership.name}</h3>
            <p><strong>Pris:</strong> {membership.price}</p>
            <ul>
              {membership.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
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
      }}>Välj {membership.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipComponent;

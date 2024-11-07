import React from 'react';

const ChooseMemberships = [
  {
    id: 1,
    name: 'Basic',
    price: '199 SEK/month',
    benefits: ['Tillgång till gym', '1 gästpass per månad'],
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

const MembershipOptions = () => {
  const handleSelect = (membership) => {
    alert(`You selected the ${membership.name} membership!`);
    // Ska lägga till funktionalitet för att hantera medlemskapsval via backend här
  };

  return (
    <div>
      <h2>Select a Membership</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {ChooseMemberships.map((membership) => (
          <div key={membership.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>{membership.name}</h3>
            <p><strong>Price:</strong> {membership.price}</p>
            <ul>
              {membership.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <button onClick={() => handleSelect(membership)}>Choose {membership.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipOptions;

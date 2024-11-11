import { useState } from 'react';
import './gymInfo.css';
import LoginModal from '../logIn/LoginModal';

function GymInfo() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      <div className="info-container" aria-hidden={isLoginModalOpen}>
        <h2>En träningsupplevelse utöver det vanliga</h2>
        <p>
          På vårt gym tar vi hand om alla detaljer, så att du kan fokusera fullt ut på din träning. Med ett
          professionellt team och moderna tjänster ser vi till att ditt besök hos oss blir både smidigt och inspirerande.
          Vi har skapat en miljö där kvalitet och komfort står i centrum för din utveckling.
        </p>

        <p>
          <button className="info-link" onClick={openLoginModal}>
            Logga in 
          </button>
          eller <a href="/registration" className="info-link">bli medlem</a> för att ta del av våra tjänster.
        </p>
      </div>

      {/* Render the Login Modal */}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
      )}
    </>
  );
}

export default GymInfo;

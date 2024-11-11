import {useState} from "react";
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './noteModal.css';

Modal.setAppElement('#root'); 

function NoteModal({ isOpen, onRequestClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave({ title, description });
    setTitle(''); 
    setDescription('');
    onRequestClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="note-modal"
      overlayClassName="note-modal-overlay"
    >
      <h2>Lägg till Anteckning</h2>
      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Beskrivning:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button onClick={handleSave} className="save-btn">Spara</button>
      <button onClick={onRequestClose} className="cancel-btn">Avbryt</button>
    </Modal>
  );
}

NoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NoteModal;
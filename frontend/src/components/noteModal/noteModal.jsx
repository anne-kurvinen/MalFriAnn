import { useState, useEffect } from "react";
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './noteModal.css';

Modal.setAppElement('#root');

function NoteModal({ isOpen, onRequestClose, onSave, selectedNote }) {
  // State for title and description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // When the modal opens and there's a selected note, set the state with the note's data
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
    }
  }, [selectedNote, isOpen]);

  // Handle save logic: If there is a selected note, update it; otherwise, create a new note
  const handleSave = () => {
    const noteData = { title, description };
    
    // If a selected note exists, update it, otherwise create a new one
    onSave(noteData);
    
    // Clear fields after save
    setTitle('');
    setDescription('');
    onRequestClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="note-modal"
      overlayClassName="note-modal-overlay"
    >
      <h2>{selectedNote ? 'Redigera Anteckning' : 'Lägg till Anteckning'}</h2>
      
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
  selectedNote: PropTypes.object, 
};

export default NoteModal;

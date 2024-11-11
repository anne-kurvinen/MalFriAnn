import { useState } from 'react';
import NoteModal from '../noteModal/noteModal';
import './Notes.css';

function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNote = (note) => {
    const newNote = { ...note, id: new Date().getTime() };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="note-container">
      <h2>Skriv ner dina träningsresultat</h2>
      <p> - ett smidigare sätt att hålla koll på din utveckling</p>
      
      <div className="note-content">
        <h2>Anteckningar:</h2>
        <button className="add-btn" onClick={openModal}>Lägg till +</button>

        <div className="notes-list">
          {notes.map(note => (
            <div key={note.id} className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
          ))}
        </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSave={addNote}
      />
    </div>
  );
}

export default Notes;

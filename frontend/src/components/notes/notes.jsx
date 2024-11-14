import { useState, useEffect } from 'react';
import NoteModal from '../noteModal/noteModal';
import { fetchAllNotes, createNote, updateNote, deleteNote } from '../../paths/notePaths';
import './Notes.css';

function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); 


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch all notes when component mounts
  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchAllNotes();
      setNotes(fetchedNotes);
    };

    loadNotes();
  }, []);

  // Add a new note
  const addNote = async (note) => {
    try {
      const newNote = await createNote(note); 
      setNotes([...notes, newNote]); 
      closeModal();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Update an existing note
  const handleUpdateNote = async (updatedNote) => {
    try {
      const updated = await updateNote(updatedNote.id, updatedNote); 
      setNotes(notes.map(note => note.id === updated.id ? updated : note)); 
      closeModal();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id); 
      setNotes(notes.filter(note => note.id !== id)); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

 
  const handleSaveNote = (note) => {
    if (selectedNote) {
      handleUpdateNote(note); 
    } else {
      addNote(note); 
    }
  };

  
  const openEditModal = (note) => {
    setSelectedNote(note); 
    openModal(); 
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
              <button onClick={() => openEditModal(note)}>Redigera</button>
              <button onClick={() => handleDeleteNote(note.id)}>Ta bort</button>
            </div>
          ))}
        </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSave={handleSaveNote}
        selectedNote={selectedNote} 
      />
    </div>
  );
}

export default Notes;

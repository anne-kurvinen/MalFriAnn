import { useState, useEffect } from 'react';
import axios from 'axios'; 
import NoteModal from '../noteModal/noteModal';
import './Notes.css';

function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // Notes state
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(''); // For error messages

  // Open and close the modal for adding new notes
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch all notes for the logged-in user
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true); // Set loading to true when starting the fetch
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No valid token found. Please log in again.');
          return;
        }

        const response = await axios.get('/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(response.data);
      } catch {
        setError('Failed to load notes. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false when the fetch is done
      }
    };

    loadNotes();
  }, []);

  // Add a new note
  const addNote = async (note) => {
    try {
      setLoading(true); // Set loading to true while adding the note
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No valid token found. Please log in again.');
        return;
      }

      const response = await axios.post('/api/notes', note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes([...notes, response.data]); // Add new note to the list
    } catch (error) {
      setError('Failed to create note.');
      console.error('Error creating note:', error);
    } finally {
      setLoading(false); // Set loading to false after adding the note
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      setLoading(true); // Set loading to true while deleting the note
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No valid token found. Please log in again.');
        return;
      }

      await axios.delete(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(notes.filter(note => note.id !== id)); // Remove deleted note from the list
    } catch (error) {
      setError('Failed to delete note.');
      console.error('Error deleting note:', error);
    } finally {
      setLoading(false); // Set loading to false after deleting the note
    }
  };

  return (
    <div className="note-container">
      <h2>Skriv ner dina träningsresultat</h2>
      <p> - ett smidigare sätt att hålla koll på din utveckling</p>

      <div className="note-content">
        <h2>Anteckningar:</h2>

        {loading ? (
          <div>Loading...</div> 
        ) : (
          <>
            {error && <div className="error-message">{error}</div>} 

            <button className="add-btn" onClick={openModal}>Lägg till +</button>

            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note">
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                  <button onClick={() => handleDeleteNote(note.id)}>Ta bort</button>
                </div>
              ))}
            </div>
          </>
        )}
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

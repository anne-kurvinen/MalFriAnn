import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Get all notes
export const fetchAllNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Uppdate a note
export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${BASE_URL}/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/notes/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

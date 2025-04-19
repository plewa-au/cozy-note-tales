
import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Initialize notes from localStorage or empty array
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Sync notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    return newNote;
  };

  // Update an existing note
  const updateNote = (id: string, title: string, content: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, title, content, updatedAt: Date.now() } 
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return { 
    notes, 
    addNote, 
    updateNote, 
    deleteNote 
  };
};

import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  labels: string[]; // Added labels field
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
      updatedAt: Date.now(),
      labels: [] // Initialize with empty labels
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

  // Add a label to a note
  const addLabelToNote = (noteId: string, label: string) => {
    if (!label.trim()) return; // Prevent adding empty labels
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, labels: [...new Set([...note.labels, label.trim()])], updatedAt: Date.now() } // Use Set to avoid duplicates
          : note
      )
    );
  };

  // Remove a label from a note
  const removeLabelFromNote = (noteId: string, label: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, labels: note.labels.filter(l => l !== label), updatedAt: Date.now() }
          : note
      )
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    addLabelToNote,
    removeLabelFromNote
  };
};

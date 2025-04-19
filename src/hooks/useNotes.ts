import { useState, useEffect, useMemo } from 'react';

export interface Note {
  id: string;






export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });



    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Debounced query to optimize filtering performance
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredNotes = useMemo<Note[]>(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, debouncedQuery]);

  // Add a new note
  const addNote = (title: string, content: string) => {
    const newNote: Note = {

      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    return newNote;
  };

  // Update an existing note
  const updateNote = (id: string, title: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: Date.now() }
          : note




  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return {
    notes,
    filteredNotes,
    searchQuery,
    setSearchQuery,
    addNote,
    updateNote,
    deleteNote,
  };
};
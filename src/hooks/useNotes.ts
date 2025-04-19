import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export interface Note {
  id: string;









    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Sync notes to localStorage whenever they change
  useEffect(() => {





























    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Debounced search function
  const debouncedSetSearchQuery = useMemo(
    () => debounce(setSearchQuery, 300),
    []
  );

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery) {
      return notes;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.content.toLowerCase().includes(lowerCaseQuery)
    );
  }, [notes, searchQuery]);

  return {
    notes,
    filteredNotes,
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery, // Use debounced version for input
    addNote,
    updateNote,
    deleteNote
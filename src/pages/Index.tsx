import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';

const Index: React.FC = () => {
  const {
    notes,
    filteredNotes,
    searchQuery,
    setSearchQuery,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      const created = addNote(newNoteTitle, newNoteContent);
      setSelectedNote(created.id);
      setNewNoteTitle('');
      setNewNoteContent('');
    }


  const handleSelectNote = (noteId: string) => {
    setSelectedNote(noteId);
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);



















    <div className="min-h-screen flex bg-soft-purple">
      <div className="w-1/3 bg-white p-4 border-r">
        <h2 className="text-2xl font-bold mb-4 text-primary-purple">Notes</h2>
        <div className="mb-4">
          <label htmlFor="search-notes" className="sr-only">
            Search notes
          </label>
          <input
            id="search-notes"
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border border-input rounded"
          />
        </div>
        <button
          onClick={handleCreateNote}
          className="w-full bg-primary-purple text-white p-2 rounded mb-4"
        >
          New Note
        </button>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleSelectNote(note.id)}
              className={`p-3 border-b cursor-pointer ${
                selectedNote === note.id ? 'bg-soft-purple' : ''
              }`}
            >
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-neutral-gray text-sm truncate">
                {note.content}
              </p>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-neutral-gray">
            No notes found
          </div>
        )}
      </div>
      <div className="w-2/3 p-6">
        <input
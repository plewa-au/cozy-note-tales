
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      addNote(newNoteTitle, newNoteContent);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNote(noteId);
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);
    }
  };

  const handleUpdateNote = () => {
    if (selectedNote && newNoteTitle.trim()) {
      updateNote(selectedNote, newNoteTitle, newNoteContent);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      deleteNote(selectedNote);
      setSelectedNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  return (
    <div className="min-h-screen flex bg-soft-purple">
      <div className="w-1/3 bg-white p-4 border-r">
        <h2 className="text-2xl font-bold mb-4 text-primary-purple">Notes</h2>
        <button 
          onClick={handleCreateNote}
          className="w-full bg-primary-purple text-white p-2 rounded mb-4"
        >
          New Note
        </button>
        {notes.map(note => (
          <div 
            key={note.id} 
            onClick={() => handleSelectNote(note.id)}
            className={`p-3 border-b cursor-pointer ${
              selectedNote === note.id ? 'bg-soft-purple' : ''
            }`}
          >
            <h3 className="font-semibold">{note.title}</h3>
            <p className="text-neutral-gray text-sm truncate">{note.content}</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-6">
        <input 
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full text-2xl font-bold mb-4 p-2 border-b"
        />
        <textarea 
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Write your note here..."
          className="w-full h-[calc(100vh-200px)] p-2"
        />
        <div className="flex space-x-4 mt-4">
          {selectedNote && (
            <button 
              onClick={handleDeleteNote}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          )}
          <button 
            onClick={selectedNote ? handleUpdateNote : handleCreateNote}
            className="bg-primary-purple text-white p-2 rounded"
          >
            {selectedNote ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

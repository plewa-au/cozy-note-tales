import React, { useState, useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { notes, filteredNotes, searchQuery, setSearchQuery, addNote, updateNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [currentNoteContent, setCurrentNoteContent] = useState('');

  // Update form fields when selected note changes
  useEffect(() => {
    const note = notes.find(n => n.id === selectedNoteId);
    if (note) {
      setCurrentNoteTitle(note.title);
      setCurrentNoteContent(note.content);
    } else {
      setCurrentNoteTitle('');
      setCurrentNoteContent('');
    }
  }, [selectedNoteId, notes]);

  const handleCreateNote = () => {
    if (currentNoteTitle.trim()) {
      const newNote = addNote(currentNoteTitle, currentNoteContent);
      setSelectedNoteId(newNote.id); // Select the newly created note
    }
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleUpdateNote = () => {
    if (selectedNoteId && currentNoteTitle.trim()) {
      updateNote(selectedNoteId, currentNoteTitle, currentNoteContent);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId);
      setSelectedNoteId(null); // Deselect after deleting
    }
  };

  const handleNewNoteClick = () => {
    setSelectedNoteId(null); // Deselect any current note
    setCurrentNoteTitle('');
    setCurrentNoteContent('');
  };

  return (
    <div className="min-h-screen flex bg-soft-purple">
      <div className="w-1/3 bg-white p-4 border-r flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-primary-purple">Notes</h2>
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleNewNoteClick}
          className="w-full bg-primary-purple text-white p-2 rounded mb-4"
        >
          New Note
        </Button>
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 && searchQuery ? (
            <p className="text-neutral-gray text-center">No notes found matching your search.</p>
          ) : filteredNotes.length === 0 && !searchQuery ? (
            <p className="text-neutral-gray text-center">No notes yet. Create one!</p>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note.id)}
                className={`p-3 border-b cursor-pointer ${
                  selectedNoteId === note.id ? 'bg-soft-purple' : ''
                }`}
              >
                <h3 className="font-semibold">{note.title || 'Untitled Note'}</h3>
                <p className="text-neutral-gray text-sm truncate">{note.content || 'No content'}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-2/3 p-6 flex flex-col">
        <Input
          value={currentNoteTitle}
          onChange={(e) => setCurrentNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full text-2xl font-bold mb-4 p-2 border-b"
        />
        <textarea
          value={currentNoteContent}
          onChange={(e) => setCurrentNoteContent(e.target.value)}
          placeholder="Write your note here..."
          className="w-full flex-1 p-2 border rounded-md resize-none"
        />
        <div className="flex space-x-4 mt-4">
          {selectedNoteId && (
            <Button
              onClick={handleDeleteNote}
              variant="destructive"
            >
              Delete
            </Button>
          )}
          <Button
            onClick={selectedNoteId ? handleUpdateNote : handleCreateNote}
            className="bg-primary-purple text-white"
          >
            {selectedNoteId ? 'Update Note' : 'Create Note'}
          </Button>
        </div>
      </div>
    </div>
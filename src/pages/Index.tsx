import React, { useState, useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [currentNoteContent, setCurrentNoteContent] = useState('');

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  useEffect(() => {
    if (selectedNote) {
      setCurrentNoteTitle(selectedNote.title);
      setCurrentNoteContent(selectedNote.content);
    } else {
      setCurrentNoteTitle('');
      setCurrentNoteContent('');
    }
  }, [selectedNote]);

  const handleCreateNote = () => {
    const newNote = addNote('New Note', '');
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNote = () => {
    if (selectedNoteId && currentNoteTitle.trim()) {
      updateNote(selectedNoteId, currentNoteTitle, currentNoteContent);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId);
      setSelectedNoteId(null);
    }
  };

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-1/4 border-r bg-muted/40">
        <Card className="h-full rounded-none border-none">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Notes
              <Button variant="ghost" size="icon" onClick={handleCreateNote}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-120px)]">
              {notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-accent ${
                    selectedNoteId === note.id ? 'bg-accent' : ''
                  }`}
                >
                  <h3 className="font-semibold truncate">{note.title || 'Untitled Note'}</h3>
                  <p className="text-muted-foreground text-sm truncate">{note.content || 'No content'}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col p-6">
        {selectedNoteId ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <Input
                value={currentNoteTitle}
                onChange={(e) => setCurrentNoteTitle(e.target.value)}
                placeholder="Note Title"
                className="text-2xl font-bold border-none focus-visible:ring-0"
                onBlur={handleUpdateNote}
              />
              <Button variant="destructive" size="icon" onClick={handleDeleteNote}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="mb-4" />
            <Textarea
              value={currentNoteContent}
              onChange={(e) => setCurrentNoteContent(e.target.value)}
              placeholder="Write your note here..."
              className="flex-1 p-2 border-none focus-visible:ring-0 resize-none"
              onBlur={handleUpdateNote}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a note or create a new one.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

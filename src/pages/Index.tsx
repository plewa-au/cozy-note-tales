import React, { useState, useEffect } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote, addLabelToNote, removeLabelFromNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [currentNoteContent, setCurrentNoteContent] = useState('');
  const [newLabel, setNewLabel] = useState('');

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

  const handleAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLabel.trim() && selectedNoteId) {
      addLabelToNote(selectedNoteId, newLabel.trim());
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    if (selectedNoteId) {
      removeLabelFromNote(selectedNoteId, labelToRemove);
    }
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
                  {note.labels && note.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.labels.map(label => (
                        <Badge key={label} variant="secondary">{label}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col p-6">
        {selectedNoteId && selectedNote ? (
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
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {selectedNote.labels.map(label => (
                <Badge key={label} variant="secondary" className="flex items-center gap-1">
                  {label}
                  <button
                    onClick={() => handleRemoveLabel(label)}
                    className="ml-1 p-0.5 rounded-full hover:bg-muted"
                    aria-label={`Remove label ${label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={handleAddLabel}
                placeholder="Add label..."
                className="h-8 text-sm w-auto min-w-[100px] max-w-[150px] border-dashed"
              />
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

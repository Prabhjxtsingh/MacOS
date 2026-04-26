import React, { useState, useEffect } from 'react';
import { Search, SquarePen, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('macos-notes');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Welcome to MacOS Web', content: 'This is a fully functional web-based OS simulation.\n\nEnjoy the smooth animations and glassmorphism UI!', date: new Date().toISOString() }
    ];
  });
  
  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('macos-notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = () => {
    if (!activeNoteId) return;
    const newNotes = notes.filter(n => n.id !== activeNoteId);
    setNotes(newNotes);
    setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
  };

  const handleUpdateNote = (value) => {
    if (!activeNoteId) return;
    const title = value.split('\n')[0] || 'New Note';
    
    setNotes(notes.map(n => 
      n.id === activeNoteId 
        ? { ...n, content: value, title: title.substring(0, 30), date: new Date().toISOString() }
        : n
    ));
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-white dark:bg-[#1e1e1e] overflow-hidden rounded-b-xl">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20 flex flex-col h-full shrink-0">
        <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-200 dark:bg-gray-800 rounded-md pl-8 pr-2 py-1 text-xs outline-none text-gray-800 dark:text-gray-200"
            />
          </div>
          <button onClick={handleCreateNote} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <SquarePen size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredNotes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                activeNoteId === note.id 
                  ? 'bg-yellow-400/20 text-yellow-900 dark:text-yellow-100' 
                  : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
              }`}
            >
              <h4 className="font-semibold text-sm truncate">{note.title}</h4>
              <div className="flex space-x-2 text-xs mt-1 text-gray-500 dark:text-gray-400">
                <span>{format(new Date(note.date), 'MM/dd/yy')}</span>
                <span className="truncate flex-1">{note.content.substring(0, 20)}...</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
        <div className="h-10 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-4">
          <button onClick={handleDeleteNote} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
        
        {activeNote ? (
          <textarea
            value={activeNote.content}
            onChange={(e) => handleUpdateNote(e.target.value)}
            className="flex-1 w-full p-6 resize-none outline-none bg-transparent text-gray-800 dark:text-gray-200"
            placeholder="Start typing..."
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            No note selected
          </div>
        )}
      </div>
    </div>
  );
}

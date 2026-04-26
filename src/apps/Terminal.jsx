import React, { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Last login: ' + new Date().toString().split(' GMT')[0] + ' on ttys000' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: `user@MacBook-Pro ~ % ${input}` }];
      
      let output = '';
      switch(cmd) {
        case 'help':
          output = 'Available commands: help, clear, date, whoami, echo [text], ls';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'date':
          output = new Date().toString();
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'ls':
          output = 'Desktop\nDocuments\nDownloads\nLibrary\nMovies\nMusic\nPictures\nPublic';
          break;
        default:
          if (cmd.startsWith('echo ')) {
            output = input.substring(5);
          } else if (cmd !== '') {
            output = `zsh: command not found: ${cmd}`;
          }
      }

      if (output) {
        newHistory.push({ type: 'output', text: output });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div 
      className="flex flex-col h-full w-full bg-black/90 font-mono text-sm p-2 overflow-y-auto rounded-b-xl"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div 
          key={i} 
          className={`${line.type === 'input' ? 'text-green-400' : 'text-gray-200'} whitespace-pre-wrap`}
        >
          {line.text}
        </div>
      ))}
      <div className="flex text-green-400 mt-1">
        <span className="mr-2">user@MacBook-Pro ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-gray-200"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

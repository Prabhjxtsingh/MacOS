import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Plus, LayoutGrid, Shield } from 'lucide-react';

export default function Safari() {
  const [url, setUrl] = useState('https://wikipedia.org');
  const [inputUrl, setInputUrl] = useState('wikipedia.org');

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#1e1e1e]">
      {/* Browser Toolbar */}
      <div className="h-14 flex items-center px-4 space-x-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-black/50 backdrop-blur-md shrink-0">
        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors opacity-50">
            <ChevronRight size={20} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <RotateCw size={16} />
          </button>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="flex-1 max-w-2xl mx-auto"
        >
          <div className="flex items-center bg-white dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 shadow-sm mx-8">
            <Shield size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 text-center focus:text-left"
            />
          </div>
        </form>

        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Plus size={20} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 relative">
        {url.includes('google.com') || url.includes('apple.com') || url.includes('facebook.com') ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Shield size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connection Refused by Host</h2>
            <p className="text-sm text-gray-500 max-w-md">
              The website <strong>{url}</strong> has set strict security policies (X-Frame-Options) that prevent it from being loaded inside another website (iframe). This is not a vulnerability in the OS, but a security feature of the destination site.
            </p>
            <p className="text-sm mt-4 text-blue-500 cursor-pointer hover:underline" onClick={() => setUrl('https://wikipedia.org')}>
              Return to Wikipedia
            </p>
          </div>
        ) : (
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="Safari Browser"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onError={() => console.log('iframe load error')}
          />
        )}
      </div>
    </div>
  );
}

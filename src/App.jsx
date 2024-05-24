import React, { useState, useCallback, useEffect, useRef } from 'react';
import StarsCanvas from './stars';
import './styles.css'
function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!#$%&'()*+-./:;<=>?@[]^_{|}~";
    }
    for (let index = 0; index < length; index++) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str.charAt(ind);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className='galaxy-background min-h-screen flex items-center justify-center'>
      <StarsCanvas />
      <div className='relative z-10 w-full max-w-lg mx-auto shadow-2xl rounded-2xl px-8 py-10 bg-gray-800 border-4 border-blue-500'>
        <h2 className='text-center text-white mb-10 animate-bounce'>Password Generator</h2>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-3 px-4 text-lg text-gray-800'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors'
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className='flex flex-col space-y-4 text-sm'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer flex-grow'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='text-white'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              id="NumberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className='cursor-pointer'
            />
            <label htmlFor="NumberInput" className='text-white'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              id="CharInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className='cursor-pointer'
            />
            <label htmlFor="CharInput" className='text-white'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

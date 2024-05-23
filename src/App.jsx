import React, { useState, useCallback,useEffect,useRef} from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const passwordReff=useRef(null)
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
  }, [length, numberAllowed, charAllowed,setPassword]);

  const CopyPassword=useCallback(()=>{
    passwordReff.current?.select()
    passwordReff.current?.setSelectionRange(0,99)
      window.navigator.clipboard.writeText(password)
  },[password])
  // Call passwordGenerator whenever any dependency changes
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator,length,numberAllowed]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white my-3 '>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='Password'
            readOnly
            ref={passwordReff}
          />
          <button 
          className=' outline-none bg-blue-700 text-white'
          onClick={CopyPassword}
          >copy</button>
        
        </div>
          <div className=' flex text-sm gap-x-2'>
            <div className=' flex items-center gap-x-1'>
              <input type="range" 
              min={8}
              max={100}
              className=' cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>length:{length}</label>
             
            </div>
            <div className=' flex items-center gap-x-1 px-1'>
            <input type="checkbox" 
              id="NumberInput"
              defaultChecked={numberAllowed}
              
              onChange={()=>{setNumberAllowed((prev)=>!prev)}}
              />
              <label >Numbers</label>
            </div>
            <div className=' flex items-center gap-x-1 px-1'>
            <input type="checkbox" 
              id="NumberInput"
              defaultChecked={numberAllowed}
              
              onChange={()=>{setCharAllowed((prev)=>!prev)}}
              />
              <label >Character</label>
            </div>
          </div>
      </div>
    </>
  );
}

export default App;

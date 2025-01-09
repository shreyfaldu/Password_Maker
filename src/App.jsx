import { useState , useCallback , useEffect , useRef} from 'react'

import './App.css'

function App() {
  const [length, setlenght] = useState(10)
  const [numberAllowed,setnumberAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}[]`~"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
     <div className='border-y-4 text-teal-800  border-teal-300 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-500 bg-gray-800 
     '>
      <h1 className='text-3xl text-white text-center my-4'>"Password Generatore"</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-1'
        placeholder='Password'
        readOnly 
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipBoard}
        className='bg-teal-500 hover:bg-teal-700  text-teal-800 font-bold py-2 px-4 border border-teal-700 rounded '
        >Copy</button>
      </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setlenght(e.target.value)}}
         />
         <label className='text-teal-300'>Lenght: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={() => {
          setnumberAllowed((prev)=> !prev)
        }}
        />
        <label htmlFor="numberInput" className='text-teal-300'>Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={() => {
          setcharAllowed((prev)=>!prev)
        }}
        />
        <label htmlFor="characterInput" className='text-teal-300'>Characters</label>
      </div>
    </div>

     </div>
    </>
  )
}

export default App

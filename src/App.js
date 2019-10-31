import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count,setCount] = useState(0);
  useEffect(()=>{
    document.title=`You Click ${count} times`;
  })
  return (
    <div className="App">
      <p>
        You Clicked {count} times
      </p>
      <button onClick={()=>setCount(count+1)}>
        Click Me!
      </button>
    </div>
  );
}

export default App;

//It’s hard to reuse stateful logic between components
//Complex components become hard to understand
//Classes confuse both people and machines


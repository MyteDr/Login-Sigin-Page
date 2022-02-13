import React from 'react'
import Selectcomp from './components/Selectcomp'
import { mainContext } from './context'
import { useState } from 'react'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [methods,setMethods] =useState([]);
  const addMethods = (item)=>{
      setMethods({...methods,...item})
  }
  const data ={
    addMethods,
    ...methods
  }
  return (
    <mainContext.Provider value={data}>
      <ToastContainer/>
      <div className="cont">
        <Selectcomp/>
      </div>
    </mainContext.Provider>
  )
}

export default App
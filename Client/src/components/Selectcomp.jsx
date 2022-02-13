import React from 'react'
import Logincomp from "./Logincomp"
import Signincomp from './Signincomp';
import { useState ,useEffect } from 'react';
import {mainContext,useContext} from "../context"

const Selectcomp = () => {
  const [login,setLogin] = useState(true);
  const {addMethods} = useContext(mainContext);
  useEffect(()=>{
    addMethods({setLogin});
  },[login])
  return (
    <>
      {login === true ? <Logincomp/> : <Signincomp/>}
    </>
  )
}

export default Selectcomp 
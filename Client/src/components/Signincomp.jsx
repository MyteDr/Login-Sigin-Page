import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import {toast} from "react-toastify"
import {mainContext,useContext} from "../context"

const Signincomp = () => {
  const [name,setName]=useState("");
  const [passwordA,setPasswordA]=useState("");
  const [message,setMessage]=useState("");
  const [password,setPassword]=useState("");
  const {setLogin} = useContext(mainContext);
  useEffect(()=>{
    if(message=="np")
    {
      setLogin(true);
    }
  },[message])
  return (
    <div className='body'>
      <input onChange={(e)=>{setName(e.target.value)}} className='input' placeholder='Name...' type="text"/>
      <input onChange={(e)=>{setPassword(e.target.value)}} className='input' placeholder='Password...' type="password"/>
      <input onChange={(e)=>{setPasswordA(e.target.value)}} className='input' placeholder='Password again...' type="password"/>
      <button onClick={(e)=>{
        if(name!=="" && password!=="" && passwordA!=="")
        {
          if(password!==passwordA)
          {
            toast.error("Password does not match");
          }
          else{
            axios.post("http://localhost:8080",{name:name,password:password}).then(res =>{
              setMessage(res.data.status);
              if(res.data.status=="db")
              {
                toast.error("Username is already used")
              }
            });
          }
        }
        else{
          toast.error("Please do not leave the field blank");
        }

      }} className='btn'>Sign in</button>
    </div>
  )
}

export default Signincomp

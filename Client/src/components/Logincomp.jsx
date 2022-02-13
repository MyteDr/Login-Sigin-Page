import React from 'react'
import { useState } from 'react'
import { mainContext , useContext } from '../context';
import { toast } from 'react-toastify';
import axios from 'axios';

const Logincomp = () => {
  const [auth,setAuth] = useState("");
  const [name,setName] = useState("");
  const [passw,setPassw] = useState("");
  const {setLogin} = useContext(mainContext);
  return (
    <div className="body">
      <input className='input' onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Name...' type="text" />
      <input className='input' onChange={(e)=>{setPassw(e.target.value)}} value={passw} placeholder='Password...' type="password"/>
      <button onClick={()=>{setLogin(false)}} className='btn'>Sign in</button>
      <button onClick={()=>{
        if(name !=="" && passw!=="")
        {
          axios.post("http://localhost:8080/login",{name:name,password:passw}).then(res=>{
            if(res.data.login=="kb")
            {
              toast.warn("User not found")
            }
            if(res.data.login=="gy")
            {
              toast.info(`Welcome ${name}`);
            }
            if(res.data.login=="hs")
            {
              toast.error(`Incorrect password`);
            }
            console.log(res.data.login);
            setAuth(res.data.login);
          })
        }
        else{
          toast.warning("Please do not leave the field blank");
        }
      }} className='btn'>Log in</button>
    </div>
  )
}

export default Logincomp
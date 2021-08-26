import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {reach} from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router'
import './App.css';

const initialFormValues={
  username:'',
  password:'',
}

const initialErrors={
  username:'',
  password:'',
}

function App() {
  
  const [formValues, setFormValues]= useState(initialFormValues)
  const {push} = useHistory();
  const onChange=(evt)=>{
    const {name, value}= evt.target
    validate(name, value)
    setFormValues({...formValues, [name]:value})
}

const submitForm=()=>{
    const newData={
        username: formValues.username.trim(),
        password: formValues.password,
    }
    setFormValues(initialFormValues)
}
const onSubmit=(evt)=>{
    evt.preventDefault()

    axios
    .post('link goes here', formValues) //end point needed here
    .then(res =>{
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        push('/homepage') //the right page goes here
    })
    .catch(err =>{
        console.log(err)
    })
    submitForm()
}

  return (
    <main>
      <h1>SIRAK'S WEBSITE</h1>
      <button>lets go</button>
      <form onSubmit={onSubmit}>
                  <div className='errors'>
                      <div>{errors.username}</div><br/>
                      <div>{errors.password}</div><br/>
                  </div>
                <label htmlFor='username'>Username:
                  <input 
                  type='text' 
                  name='username' 
                  value={formValues.username}
                  placeholder='username'
                  onChange={onChange}/>
                </label><br/><br/>

                <label htmlFor='Password'>Password:
                  <input
                  type='password'
                  name='password'
                  value={formValues.password}
                  placeholder='password'
                  onChange={onChange}/>
                </label><br/><br/>
                  <button disabled={disabled}>Login</button>
              </form>
    </main>
  );
}

export default App;

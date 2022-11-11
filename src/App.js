import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

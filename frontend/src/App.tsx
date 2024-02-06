import { useState } from 'react'
import { BrowserRouter, RouterProvider, createBrowserRouter, Routes,Route} from 'react-router-dom';

import './App.css'
import LandingPage from './components/Landing';
import Room from './components/Room';

function App() {
  

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path = '/' element={<LandingPage/>}/>
        <Route path = '/room' element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'

import Post from './Componants/Post'
import MainLayout from './Componants/MainLayout'
import Login from './Componants/Login'
import Signup from './Componants/Signup'
import { Route, Routes } from 'react-router'



export default function App() {
  return (
    <div className=''>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Post />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>

  )
}

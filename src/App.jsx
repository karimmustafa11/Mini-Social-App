import React from 'react'

import Post from './Componants/Post'
import MainLayout from './Componants/MainLayout'
import Login from './Componants/Login'
import { Route, Routes } from 'react-router'

export default function App() {
  return (
    <div className=''>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Post />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

  )
}

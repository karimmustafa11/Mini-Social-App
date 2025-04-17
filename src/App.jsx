import React from 'react'
import Header from './Componants/Header'
import Footer from './Componants/Footer'
import Post from './Componants/Post'
import MainLayout from './Componants/MainLayout'
import { Route, Routes } from 'react-router'

export default function App() {
  return (
    <div className=''>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>

  )
}

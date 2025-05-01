import React from 'react'
import MainLayout from './Componants/MainLayout'
import Login from './Componants/Login'
import Signup from './Componants/Signup'
import { Route, Routes } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './Componants/Home'
import AddPost from './Componants/AddPost'


export default function App() {
  return (

    <div className=''>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        draggable={false}
      />


      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </div>

  )
}

import React from 'react';
import MainLayout from './Componants/MainLayout';
import Login from './Componants/Login';
import Signup from './Componants/Signup';
import { Route, Routes, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './Componants/Home';
import AddPost from './Componants/AddPost';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import EditPost from './Componants/EditPost';

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-base-100">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />

      <Routes>
        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" replace />}>
          <Route index element={<Home />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:id" element={<EditPost />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
      </Routes>
    </div>
  );
}
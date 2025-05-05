import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import MainLayout from './Componants/MainLayout';
import Login from './Componants/Login';
import Signup from './Componants/Signup';
import Home from './Componants/Home';
import AddPost from './Componants/AddPost';
import EditPost from './Componants/EditPost';

export default function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-base-100">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        toastStyle={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          margin: '8px auto',
          maxWidth: '500px',
          width: '90%',
        }}
      />

      <Routes>
        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to="/login" state={{ from: location }} replace />}
        >
          <Route index element={<Home />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:id" element={<EditPost />} />
        </Route>

        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
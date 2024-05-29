import React from 'react';
import Navbar from '../components/LandingPage/Navbar';
import Register from '../components/Auth/Register/Register';
import NavbarAuth from '../components/NavbarAuth';

const RegisterPage = () => {
  return (
    <div>
        <NavbarAuth/>
        <Register/>
    </div>
  );
}

export default RegisterPage;

// src/components/Layout.js
import Navbar from '@/pages/Navbar';
import React from 'react';

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders the child route */}
    </>
  );
};

export default Layout;

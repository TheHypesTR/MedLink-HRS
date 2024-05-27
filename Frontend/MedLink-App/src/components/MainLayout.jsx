import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

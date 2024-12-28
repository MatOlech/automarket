import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

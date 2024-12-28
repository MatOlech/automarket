import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white border-t mt-12'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Dziennik odwiedzin</h3>
            {}
          </div>
        </div>
        <div className='text-center mt-8 text-gray-500 text-sm'>
          <p>© 2024 AutoMarket Pro. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

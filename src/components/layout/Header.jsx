import React from 'react';
import { Car, Search, Plus } from 'lucide-react';

const Header = ({ onSearch, onAddClick }) => {
  return (
    <header className='bg-white shadow-lg border-b'>
      <div className='container mx-auto py-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          {}
          <div className='flex gap-4 items-center flex-1 md:max-w-xl'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Szukaj ogłoszeń...'
                className='input-search'
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
            <button 
              onClick={onAddClick}
              className='button-primary whitespace-nowrap'
            >
              <Plus className='h-5 w-5' />
              Dodaj ogłoszenie
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

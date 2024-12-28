import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';

const Filters = ({ selectedBrand, selectedPrice, onBrandChange, onPriceChange, brands, priceRanges }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md border'>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <FilterIcon className='h-5 w-5 text-gray-400 hidden md:block' />
        <div className='flex flex-1 gap-4 w-full md:w-auto'>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange?.(e.target.value)}
            className='select-filter flex-1'
          >
            <option value='all'>Wszystkie marki</option>
            {brands?.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            value={selectedPrice}
            onChange={(e) => onPriceChange?.(e.target.value)}
            className='select-filter flex-1'
          >
            {priceRanges?.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

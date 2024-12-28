import React from 'react';
import { motion } from 'framer-motion';

const ListingsGrid = ({ listings = [] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {listings.map((listing) => (
        <motion.div
          key={listing.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            {listing.image && (
              <img
                src={listing.image}
                alt={listing.title}
                className='w-full h-48 object-cover'
              />
            )}
            <div className='p-4'>
              <h3 className='text-xl font-semibold'>{listing.title}</h3>
              <p className='text-gray-600'>{listing.description}</p>
              <p className='text-lg font-bold text-blue-600 mt-2'>
                {listing.price} PLN
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ListingsGrid;

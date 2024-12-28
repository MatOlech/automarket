import React from 'react';

const VisitorLog = ({ entries = [] }) => {
  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Dziennik odwiedzin</h3>
      <div className='bg-white rounded-lg shadow max-h-96 overflow-y-auto'>
        {entries.length === 0 ? (
          <p className='text-gray-500 text-center p-4'>
            Brak wpisów w dzienniku
          </p>
        ) : (
          <div className='divide-y'>
            {entries.map((entry, index) => (
              <div key={index} className='p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-medium'>{entry.name}</p>
                    <p className='text-sm text-gray-500'>{entry.email}</p>
                  </div>
                  <span className='text-xs text-gray-400'>{entry.date}</span>
                </div>
                {entry.message && (
                  <p className='text-gray-600 mt-2 text-sm'>{entry.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorLog;

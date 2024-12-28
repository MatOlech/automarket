import React, { useState } from 'react';
import { X } from 'lucide-react';

const ListingForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    year: '',
    mileage: '',
    description: '',
    images: []
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>Dodaj ogłoszenie</h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Marka</label>
                <input
                  type='text'
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Model</label>
                <input
                  type='text'
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Cena (PLN)</label>
                <input
                  type='number'
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Rok produkcji</label>
                <input
                  type='number'
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Przebieg (km)</label>
                <input
                  type='number'
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Opis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className='w-full p-2 border rounded'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Zdjęcia</label>
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
                className='w-full p-2 border rounded'
              />
              {formData.images.length > 0 && (
                <div className='grid grid-cols-4 gap-2 mt-2'>
                  {formData.images.map((image, index) => (
                    <div key={index} className='relative'>
                      <img
                        src={image}
                        alt={}
                        className='w-full h-24 object-cover rounded'
                      />
                      <button
                        type='button'
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='flex justify-end space-x-4'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border rounded hover:bg-gray-50'
              >
                Anuluj
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Dodaj ogłoszenie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;

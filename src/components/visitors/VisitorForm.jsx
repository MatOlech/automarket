import React from 'react';

const VisitorForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      date: new Date().toLocaleString()
    };
    onSubmit?.(data);
    e.target.reset();
  };

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Wpisz się do dziennika</h3>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Imię i nazwisko</label>
          <input
            type='text'
            name='name'
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            name='email'
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Wiadomość (opcjonalnie)</label>
          <textarea
            name='message'
            rows='3'
            className='w-full p-2 border rounded'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Zapisz się
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;

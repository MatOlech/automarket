import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';

function AutoMarket() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visitorInfo, setVisitorInfo] = useState({ ip: '', visits24h: 0 });
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitorInfo();
    loadVisitors();
    const interval = setInterval(updateVisits, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchVisitorInfo = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setVisitorInfo(prev => ({ ...prev, ip: data.ip }));
      addNewVisit(data.ip);
    } catch (error) {
      setVisitorInfo(prev => ({ ...prev, ip: 'Nie można pobrać IP' }));
    }
  };

  const addNewVisit = (ip) => {
    const now = new Date();
    const newVisit = {
      ip,
      timestamp: now.getTime()
    };
    setVisitors(prev => {
      const newVisitors = [...prev, newVisit];
      localStorage.setItem('visitors', JSON.stringify(newVisitors));
      return newVisitors;
    });
  };

  const loadVisitors = () => {
    const savedVisitors = localStorage.getItem('visitors');
    if (savedVisitors) {
      setVisitors(JSON.parse(savedVisitors));
    }
  };

  const updateVisits = () => {
    const now = new Date().getTime();
    const last24h = now - (24 * 60 * 60 * 1000);
    const visits24h = visitors.filter(v => v.timestamp > last24h).length;
    setVisitorInfo(prev => ({ ...prev, visits24h }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddListing = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newListing = {
      id: Date.now(),
      brand: formData.get('brand'),
      model: formData.get('model'),
      price: formData.get('price'),
      description: formData.get('description'),
      date: new Date().toLocaleDateString()
    };

    const fileInput = e.target.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newListing.image = e.target.result;
        setListings(prev => [newListing, ...prev]);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      setListings(prev => [newListing, ...prev]);
    }

    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <h1 className="text-3xl font-bold text-gray-900">AutoMarket</h1>
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj ogłoszeń..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <button 
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Dodaj ogłoszenie
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4">
          <select className="p-2 border rounded-lg min-w-[200px]">
            <option value="">Volkswagen</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
          </select>
          <select className="p-2 border rounded-lg min-w-[200px]">
            <option value="">Dowolna cena</option>
            <option value="0-20000">do 20 000 PLN</option>
            <option value="20000-50000">20 000 - 50 000 PLN</option>
          </select>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {listing.image && (
                <img 
                  src={listing.image} 
                  alt={`${listing.brand} ${listing.model}`} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{listing.brand} {listing.model}</h3>
                <p className="text-gray-600 mt-2">{listing.description}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">{listing.price} PLN</p>
                <p className="text-sm text-gray-500 mt-2">Dodano: {listing.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Dodaj nowe ogłoszenie</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddListing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Marka</label>
                  <select name="brand" className="w-full p-2 border rounded-lg" required>
                    <option value="">Wybierz markę</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input name="model" type="text" className="w-full p-2 border rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cena</label>
                  <input name="price" type="number" className="w-full p-2 border rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Opis</label>
                  <textarea name="description" rows="4" className="w-full p-2 border rounded-lg" required></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Zdjęcia</label>
                  <input type="file" accept="image/*" className="w-full p-2 border rounded-lg" />
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Dodaj ogłoszenie
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Dziennik odwiedzin</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">Twój adres IP: {visitorInfo.ip}</p>
            <p className="text-gray-700">Liczba odwiedzin w ciągu ostatnich 24h: {visitorInfo.visits24h}</p>
          </div>
          <div className="mt-8 text-center text-gray-600">
            Mateusz Olech.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AutoMarket;

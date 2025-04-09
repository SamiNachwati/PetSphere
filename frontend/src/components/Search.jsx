import Cat from '../assets/cat.jpg';
import Dog from '../assets/dog.jpg';
import Fish from '../assets/fish.jpg';
import Hamster from '../assets/hamsters.jpg';
import Horse from '../assets/horse.jpg';
import Lizard from '../assets/lizard.jpg';
import Parrot from '../assets/parrot.jpg';
import Rabbit from '../assets/rabbit.jpg';
import Turtle from '../assets/turtle.jpg';
import Bird from '../assets/bird.jpg';
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allPets, setAllPets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);

  const petImages = {
    cat: Cat,
    dog: Dog,
    fish: Fish,
    hamster: Hamster,
    horse: Horse,
    lizard: Lizard,
    parrot: Parrot,
    rabbit: Rabbit,
    turtle: Turtle,
    bird: Bird,
  };

  const animals = [
    "Bird",
    "Cat",
    "Dog",
    "Fish",
    "Hamster",
    "Horse",
    "Lizard",
    "Parrot",
    "Rabbit",
    "Turtle"
    ];

  useEffect(() => {
    fetchAllPets();
  }, []);

  const fetchAllPets = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAllPets();
      setAllPets(data);
      setSearchResults(data);
    } catch (error) {
      setError('Failed to load pets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => performSearch(term), 300));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults(allPets);
  };

  const performSearch = async (term) => {
    if (!term.trim()) {
      setSearchResults(allPets);
      return;
    }

    const lowercaseTerm = term.trim().toLowerCase();

    const hasSearch = allPets.some((element) => {
      return (
        element.name?.toLowerCase().includes(lowercaseTerm) ||
        element.animal?.toLowerCase().includes(lowercaseTerm) ||
        element.description?.toLowerCase().includes(lowercaseTerm) ||
        element.age?.toString().includes(lowercaseTerm)
      );
    });
    console.log(allPets);

    if(!hasSearch){
      toast.error(`Sorry, we don't have info on "${term}"`);
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await apiService.searchPets(term);
      setSearchResults(results);
      setPage(1);
    } catch (error) {
      setError('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentPageData = () => {
    const start = (page - 1) * rowsPerPage;
    return searchResults.slice(start, start + rowsPerPage);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
      <div className="max-w-6xl mx-auto p-25">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
          Find Your Perfect Pet
        </h1>

        <div className="bg-white shadow p-4 rounded-md flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              placeholder="Search by animal, description, age, or price..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm"
          >
            <option value="table">Table View</option>
            <option value="cards">Card View</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="bg-white text-center p-6 rounded shadow">
            <div className="text-5xl text-gray-300 mb-4">🐾</div>
            <p className="text-lg font-medium text-gray-700">No pets found matching your search.</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search term or browse all pets.</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <div className="overflow-auto rounded shadow">
                <table className="w-full text-left border border-gray-200">
                  <thead className="bg-gray-100 text-sm font-bold text-gray-700">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Animal</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageData().map((pet) => (
                      <tr key={pet.id} className="border-t hover:bg-gray-50 text-sm">
                        <td className="px-4 py-2 font-medium">{pet.name}</td>
                        <td className="px-4 py-2">{pet.animal}</td>
                        <td className="px-4 py-2">{pet.description}</td>
                        <td className="px-4 py-2">{pet.age} years</td>
                        <td className="px-4 py-2">{formatPrice(pet.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {getCurrentPageData().map((pet) => (
                  <div
                    key={pet.id}
                    className="bg-white p-4 rounded shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    {}
                    <img
                      src={petImages[pet.animal.toLowerCase()]}
                      alt={pet.animal}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{pet.name} (<span className='text-gray-400'>{pet.animal}</span>)</h3>
                      <span className="text-sm text-blue-600 font-medium">
                        {formatPrice(pet.price)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{pet.description}</p>
                    <p className="mt-2 text-xs text-gray-500">{pet.age} years old</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center mt-8 gap-2">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(searchResults.length / rowsPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded border text-sm ${
                      page === i + 1 ? 'bg-blue-500 text-white' : 'border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Showing {Math.min((page - 1) * rowsPerPage + 1, searchResults.length)} -{' '}
                {Math.min(page * rowsPerPage, searchResults.length)} of {searchResults.length} pets
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import PetForm from './PetForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faPenToSquare, faPlus,
  faAdd
} from '@fortawesome/free-solid-svg-icons';

export const Inventory = (menuOpen) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [deletePetId, setDeletePetId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPets();
  }, []);

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
  

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAllPets();
      setPets(data);
    } catch (error) {
      toast.error('Failed to load pets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPet = async (petData) => {
    try {
      await apiService.addPet(petData);
      await fetchPets();
      toast.success(`${petData.animal} was added successfully!`);
      setShowForm(false);
    } catch {
      toast.error('Failed to add pet. Please try again.');
    }
  };

  const handleUpdatePet = async (petData) => {
    try {
      await apiService.updatePet(editPet.id, petData);
      await fetchPets();
      toast.success(`${petData.animal} was updated successfully!`);
      setEditPet(null);
    } catch {
      toast.error('Failed to update pet. Please try again.');
    }
  };

  const handleDeletePet = async () => {
    try {
      await apiService.deletePet(deletePetId);
      await fetchPets();
      toast.success('Pet deleted successfully!');
    } catch {
      toast.error('Failed to delete pet.');
    } finally {
      setDeletePetId(null);
    }
  };


  const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

  const getCurrentPageData = () => {
    const start = page * rowsPerPage;
    return pets.slice(start, start + rowsPerPage);
  };

  return (
    <div className="max-w-6xl mx-auto p-20">
      <ToastContainer position="bottom-right" autoClose={2500} />

      <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6 py-5">
        Pet Inventory Management
      </h1>

      

      {showForm && (
        <PetForm 
          onSubmit={handleAddPet} 
          onCancel={() => setShowForm(false)} 
        />
      )}


      {editPet && (
        <PetForm
          initialValues={editPet}
          onSubmit={handleUpdatePet}
          onCancel={() => setEditPet(null)}
          isEdit
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Pet Name</th>
                <th className="px-4 py-2 font-semibold">Animal</th>
                <th className="px-4 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 font-semibold">Age</th>
                <th className="px-4 py-2 font-semibold">Price</th>
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((pet) => (
                <tr key={pet.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{pet.name}</td>
                  <td className="px-4 py-2">{pet.animal}</td>
                  <td className="px-4 py-2">{pet.description}</td>
                  <td className="px-4 py-2">{pet.age}</td>
                  <td className="px-4 py-2">{formatPrice(pet.price)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setEditPet(pet)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                      />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => setDeletePetId(pet.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm">
            <div>
              Showing {Math.min(page * rowsPerPage + 1, pets.length)} -{' '}
              {Math.min((page + 1) * rowsPerPage, pets.length)} of {pets.length}
            </div>
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(pets.length / rowsPerPage) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-3 py-1 border rounded ${page === i ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletePetId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center shadow-lg">
            <h2 className="text-lg font-bold mb-3">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this pet?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeletePetId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeletePet}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-10 mb-4 md:justify-end">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${showForm ? 'hidden' : ''}`}
          onClick={() => setShowForm(true)}
        >
          <FontAwesomeIcon icon={faAdd}/> New Pet
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PetForm = ({ initialValues = {}, onSubmit, onCancel, isEdit = false }) => {

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
    const [formData, setFormData] = useState({
        name: initialValues.name || '',
        animal: initialValues.animal || '',
        description: initialValues.description || '',
        age: initialValues.age || '',
        price: initialValues.price || ''
        });
          

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.animal || !formData.description || !formData.age || !formData.price) {
        toast.error('Please fill in all details!');
        return;
        }
        
        onSubmit(formData);
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8 max-w-2xl mx-auto"
        >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            {isEdit ? 'Edit Pet' : 'Add a New Pet'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="e.g. Ben"
            />
            </div>


            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (in years)</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="e.g. 2"
                min="0"
            />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal</label>
                <select
                    name="animal"
                    id="animal"
                    value={formData.animal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                >
                    <option value="">Select an animal</option>
                    {animals.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="e.g. 150"
                min="0"
                step="0.01"
            />
            </div>

            <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Brief description..."
                rows={3}
            />
            </div>

           
        </div>
        <div className="flex justify-center sm:justify-end mt-6 gap-4">
        
        <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
            Cancel
        </button>
        <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
            {isEdit ? 'Update Pet' : 'Add Pet'}
        </button>
        </div>

        </form>
    );
};

export default PetForm;

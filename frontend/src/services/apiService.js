const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Get all pets
  getAllPets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}?act=getall`);
      if (!response.ok) throw new Error('Failed to fetch pets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  },

  // Add a new pet
  addPet: async (pet) => {
    try {
      const { name, animal, description, age, price } = pet;
      const response = await fetch(
        `${API_BASE_URL}?act=add&name=${encodeURIComponent(name)}&animal=${encodeURIComponent(animal)}&description=${encodeURIComponent(description)}&age=${encodeURIComponent(age)}&price=${encodeURIComponent(price)}`
      );
      if (!response.ok) throw new Error('Failed to add pet');
      return await response.json();
    } catch (error) {
      console.error('Error adding pet:', error);
      throw error;
    }
  },

  // Delete a pet
  deletePet: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}?act=delete&id=${id}`);
      if (!response.ok) throw new Error('Failed to delete pet');
      return await response.json();
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  },

  // Update a pet
  updatePet: async (id, pet) => {
    try {
      const { name, animal, description, age, price } = pet;
      const response = await fetch(
        `${API_BASE_URL}?act=update&id=${id}&name=${name}&animal=${encodeURIComponent(animal)}&description=${encodeURIComponent(description)}&age=${encodeURIComponent(age)}&price=${encodeURIComponent(price)}`
      );
      if (!response.ok) throw new Error('Failed to update pet');
      return await response.json();
    } catch (error) {
      console.error('Error updating pet:', error);
      throw error;
    }
  },

  // Search pets
  searchPets: async (term) => {
    const encodedTerm = encodeURIComponent(term);
    const endpoint = `${API_BASE_URL}?act=search&term=${encodedTerm}`;
  
    try {
      console.log(`[API] Searching pets with term: "${term}"`);
      console.log(`[API] GET ${endpoint}`);
  
      const response = await fetch(endpoint);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API] Search failed with status ${response.status}: ${errorText}`);
        throw new Error(`Failed to search pets — Status: ${response.status}`);
      }
  
      const results = await response.json();
      console.log(`[API] Found ${results.length} results for term: "${term}"`);
      return results;
  
    } catch (error) {
      console.error(`[API] Error occurred during searchPets():`, error);
      throw error;
    }
  },
  
};
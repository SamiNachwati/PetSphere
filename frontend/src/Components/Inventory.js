//StAuth10244: I Sami Nachwati, 000879289 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, autocompleteClasses
} from '@mui/material';
import { Routes, Route, NavLink, Link, useParams, Outlet }
from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Update } from '@mui/icons-material';



function Pets() {
  
    // isLoaded keeps track of whether the initial load of pet data from the
    // server has occurred.  pets is the array of pets data in the table, and 
    // searchResults is the array of pets data after a search request.
    const [isLoaded, setIsLoaded] = useState(false);
    const [pets, setPets] = useState([]);
    const [searchResults, setSearchResults] = useState([]);


    const [isUpdated, setIsUpdated] = useState(false);
    const [id, setID] = useState(0);


    const confirmEdit = (id) => {
      setID(id)
      setIsUpdated(true);
    }

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const animal = data.get('animal');
      const description = data.get('description');
      const age = data.get('age');
      const price = data.get('price');
    
      updatePet(id, animal, description, age, price);
      setIsUpdated(false);
    };


    const handleAddPet = () => {
      // Extract values directly from the DOM (not recommended in real applications)
      const animal = document.getElementById('animal').value;
      const description = document.getElementById('description').value;
      const age = document.getElementById('age').value;
      const price = document.getElementById('price').value;
  
      addPet(animal, description, age, price);
    };



    // fetches all pet data from the server
    function fetchPets()
    {
      fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPets(result);
        })    
    }

    
    // use fetchPets as an effect with an empty array as a 2nd argument, which 
    // means fetchPets will ONLY be called when the component first mounts
    useEffect(fetchPets, []);
    
    // Inserts a pet with hardcoded data in the URL for each query parameter, we 
    // could insert a pet with custom data by building a string like this:
    //
    // let url = "http://localhost:3001/api?act=add&animal=" + animal + ...
    //
    // fetch(url)
    // .then( ... )...
    //
    function addPet(animal, description, age, price)
    {
      fetch("http://localhost:3001/api?act=add&animal=" + animal + "&description="+ description + "&age="+ age + "&price=" + price)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        })    
    }
  
    // Deletes a pet from the pet inventory, using a hardcoded id query parameter
    // Again we could delete a pet with custom data by building a string like:
    //
    // let url = "http://localhost:3001/api?act=delete&id=" + id
    //
    // fetch(url)
    // .then( ... )...
    //
    // 
    function deletePet(id)
    {
      fetch("http://localhost:3001/api?act=delete&id=" + id)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        })    
    }


    
  
    // Updates a pet in the pet inventory.  Again we use hardcoded data but 
    // could build a custom fetch URL string.
    function updatePet(id, animal, description, age, price)
    {

      fetch("http://localhost:3001/api?act=update&id=" + id + "&animal="+ animal + "&description="+ description + "&age=" + age + "&price=" + price)
      .then(res => res.json())
      .then(
        (result) => {
          fetchPets();
        });
    }  
    



    const returnForm = () => {
      if (isUpdated) {
        // Assuming you fetch the pet's current data to edit
        const petToEdit = pets.find(pet => pet.id === id);
        return (
          <Box class='form-container' component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Typography variant="h6">Edit Pet</Typography>
            <Box id="edit-form" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="animal-edit"
                label="Animal"
                name="animal"
                defaultValue={petToEdit ? petToEdit.animal : ''}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description-edit"
                label="Description"
                name="description"
                defaultValue={petToEdit ? petToEdit.description : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="age-edit"
                label="Age"
                name="age"
                defaultValue={petToEdit ? petToEdit.age : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price-edit"
                label="Price"
                name="price"
                defaultValue={petToEdit ? petToEdit.price : ''}
              />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 1 }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsUpdated(false)}
              >
                Cancel
              </Button>
            </Box>
            </Box>
          </Box>
        );
      }
    };
    
    if (!isLoaded) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;
    } else {
      return (
        <Box id="table-container" sx={{ m: 4}}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ padding: '150px', fontFamily: 'Space Grotesk, sans-serif'}}>
            <TableHead>
            <TableRow sx={{
              fontSize: 'large',
              fontFamily: 'Space Grotesk, sans-serif',
              '& th': {
                fontWeight: 'bold',
                border: 0,
              },
            }}>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>

              <TableBody>
            {pets.map(pet => (
              <TableRow key={pet.id}
              >
                <TableCell>{pet.animal}</TableCell> 
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.price}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => deletePet(pet.id)}><DeleteIcon /></Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => confirmEdit(pet.id)}> <EditIcon /> </Button>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          </TableContainer>
          <br />
          {returnForm()}
          <br />
          <form>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, textAlign: 'center' }}>
              <br />
              <Typography variant="h6">Add a Pet</Typography>
              <div>
                <TextField required id="animal" label="Animal" variant="outlined" />
              </div>
              <div>
                <TextField required id="description" label="Description" variant="outlined" />
              </div>
              <div>
                <TextField required id="age" label="Age" variant="outlined" type="number" />
              </div>
              <div>
                <TextField required id="price" label="Price" variant="outlined" type="number" />
              </div>
              <Button variant="contained" onClick={handleAddPet}>Add Pet</Button>
            </Box>
          </form>
          <br />
        </Box>
      );
    }
  }
function Inventory() {
    return (
        <div>
        <h1>Inventory</h1>
        <p>Welcome to the Pet Store</p>
        <Pets/>
        </div>
    );
}
export default Inventory; 
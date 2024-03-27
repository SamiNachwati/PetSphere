//StAuth10244: I Sami Nachwati, 000879289 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

function SearchPet() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState('');

    // Fetches all pet data from the server
    function fetchPets() {
        fetch("http://localhost:3001/api?act=getall")
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setPets(result);
        });
    }

    useEffect(() => {
        fetchPets();
    }, []);

    // Filter pets based on search query
    const filteredPets = search.length === 0 ? pets : search



    function searchPet(term)
    {
      fetch("http://localhost:3001/api?act=search&term=" + term)
      .then(res => res.json())
      .then(
        (result) => {
          setSearch(result);
          console.log(result);
        });
    }


    const handleSearchChange = (event) => {
      const term = event.target.value;
      searchPet(term); 
  };

    return (
        <Box id="search-container" sx={{ m: 4}}>
            <Typography variant="h4" gutterBottom>
                Pet Search
            </Typography>
            <TextField
                fullWidth
                id="search"
                label="Search Pets"
                variant="outlined"
                onChange={handleSearchChange}
                sx={{ mb: 2, fontFamily: "Space Grotesk, sans-serif", background: "white", maxWidth: "30%",
                height: "50px",
                borderRadius: "50px"}}
            />
            {!isLoaded ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{
                                '& th': {
                                    fontWeight: 'bold',
                                },
                            }}>
                                <TableCell>Animal</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPets.map((pet) => (
                                <TableRow key={pet.id}>
                                    <TableCell>{pet.animal}</TableCell>
                                    <TableCell>{pet.description}</TableCell>
                                    <TableCell>{pet.age}</TableCell>
                                    <TableCell>{pet.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default SearchPet;

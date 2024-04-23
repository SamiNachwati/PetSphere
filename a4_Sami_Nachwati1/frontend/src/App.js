// Starter code for the front-end, includes examples of accessing all server 
// API routes with AJAX requests.

//StAuth10244: I Sami Nachwati, 000879289 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; 


import { Routes, Route, NavLink, Link, useParams, Outlet }
from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Home from './Components/Home';
import About from './Components/About';
import Inventory from './Components/Inventory';
import Search from './Components/Search';
import Navbar from './Components/Navbar';

// Material UI is included in the install of the front end, so we have access
// to components like Buttons, etc, when we import them.



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
// App.jsx
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { Home } from './components/Home.jsx';
import { Contact } from './components/Contact.jsx';
import { Inventory } from './components/Inventory.jsx';
import { Search } from './components/Search.jsx'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" menuOpen={menuOpen} element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;

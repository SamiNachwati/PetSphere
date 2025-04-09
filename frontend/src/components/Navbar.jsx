import React, { useState, useEffect } from 'react';
// At the top
import { Link } from 'react-router-dom';

export const Navbar = ({menuOpen, setMenuOpen}) => {   
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);
    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl text-blue-500 font-bold">PetSphere</Link>

                    <div className="w-7 h-5 relative cursopr-pointer z-40 md:hidden" 
                    onClick={() => setMenuOpen((prev) => !prev)}>
                        &#9776;
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-sm">
                        <Link to="/">Home</Link>
                        <Link to="/inventory">Inventory</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    )

}
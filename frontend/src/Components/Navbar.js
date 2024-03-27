//StAuth10244: I Sami Nachwati, 000879289 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import { NavLink } from "react-router-dom";
import petstoreimg from '../img/petstoreimg.png';

function Navbar(){
    return(
        <nav>
            <img src={petstoreimg} alt="Pet Store" />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/search">Search</NavLink>
        </nav>
    )
}

export default Navbar;
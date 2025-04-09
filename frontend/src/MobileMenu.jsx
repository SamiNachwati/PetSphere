// At the top
import { Link } from 'react-router-dom';


export const MobileMenu = ({menuOpen, setMenuOpen}) => {   

    return (
        <div
        className={`
            fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center
            transition-all duration-300 ease-in-out
            ${menuOpen ? "h-screen opacity-100 pointer-events-auto backdrop-blur-md bg-black/10" : "h-0 opacity-0 pointer-events-none"}
          `}
          
        >
            <button onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-black text-3xl focus:outline-none cursor-pointer"
            aria-label='Close Menu'
            >
                &times;
            </button>


            <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semi-bold my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
            Home
            </Link>

            <Link
            to="/inventory"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semi-bold my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
            Inventory
            </Link>

            <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semi-bold my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
            Search
            </Link>

            <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semi-bold my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
            Contact
            </Link>


         

        </div>
    );

};
// src/components/Header.jsx
import {} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-red-600 p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Zang-Movies</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-red-200">
                        Home
                    </Link>
                    <Link to="/film" className="text-white hover:text-red-200">
                        Film
                    </Link>
                    <Link to="/contact" className="text-white hover:text-red-200">
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;

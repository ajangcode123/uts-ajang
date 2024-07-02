// src/components/Header.jsx
import {} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-green-600 p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Nature Shop</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-green-200">
                        Home
                    </Link>
                    <Link to="/products" className="text-white hover:text-green-200">
                        Products
                    </Link>
                    <Link to="/about" className="text-white hover:text-green-200">
                        About
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;

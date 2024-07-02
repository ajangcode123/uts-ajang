// src/pages/Home.jsx
import {} from 'react';

const Home = () => {
    return (
        <div className="p-6 bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('bg.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-700 mb-4">Welcome to Zang Movies</h1>
                <p className="text-xl text-gray-700 mb-4">Find the best Movies here!</p>
                
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-red-700 mb-2">Featured Movies</h2>
                    <p className="text-gray-700">Discover the most popular and trending movies right now.</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-red-700 mb-2">Our Mission</h2>
                    <p className="text-gray-700">To provide the best selection of movies for all movie enthusiasts.</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-red-700 mb-2">Get Started</h2>
                    <p className="text-gray-700">Browse our collection and enjoy your favorite movies.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

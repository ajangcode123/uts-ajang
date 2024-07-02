// src/pages/Home.jsx
import {} from 'react';

const Home = () => {
    return (
        <div className="p-6 bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('daun.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to the Fruit App</h1>
                <p className="text-xl text-gray-700">Find the best fruits here!</p>
            </div>
        </div>
    );
};

export default Home;

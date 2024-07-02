// src/pages/About.jsx
import {} from 'react';

const About = () => {
    return (
        <div className="p-6 bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('daun.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">About This App</h1>
                <p className="text-xl text-gray-700">This app was developed by Ajang Galaksi.</p>
            </div>
        </div>
    );
};

export default About;

// src/pages/About.jsx
import {} from 'react';

const Contact = () => {
    return (
        <div className="p-6 bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('bg.jpg')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-700 mb-4">Contact</h1>
                <p className="text-xl text-gray-700 mb-2">This app was developed by Ajang Galaksi.</p>
                <p className="text-xl text-gray-700 mb-2">Nama: Ajang Irhas Rifai</p>
                <p className="text-xl text-gray-700 mb-2">Tempat Tanggal Lahir: Jakarta, 1 Januari 1990</p>
                <p className="text-xl text-gray-700 mb-2">Pelatihan: React</p>
                <p className="text-xl text-gray-700 mb-2">Nama Instruktur: Arya Segara</p>
                <p className="text-xl text-gray-700 mb-2">Kontak: ajang.galaksi@example.com</p>
                <p className="text-xl text-gray-700">Website: www.ajanggalaksi.com</p>
            </div>
        </div>
    );
};

export default Contact;

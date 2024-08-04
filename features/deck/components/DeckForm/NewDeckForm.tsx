"use client"
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

interface DeckFormProps {
    onDeckCreated: () => void;
}

const DeckForm: React.FC<DeckFormProps> = ({ onDeckCreated }) => {
    const [deckName, setDeckName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/decks', { deckName, userId: 1 });
            console.log("Deck created successfully:", response.data);
            onDeckCreated();
        } catch (error) {
            console.error("Error registering deck:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-left">Create New Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="deckName" className="block text-sm font-medium text-gray-700">
                        Deck Name:
                    </label>
                    <input
                        type="text"
                        id="deckName"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default DeckForm;
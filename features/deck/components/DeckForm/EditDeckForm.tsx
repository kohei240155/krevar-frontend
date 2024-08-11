"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeckSettingsProps {
    deckId: string;
    deckName: string;
    onDeckUpdated: () => void;
}

const EditDeckForm: React.FC<DeckSettingsProps> = ({ deckId, deckName: initialDeckName, onDeckUpdated}) => {
    const [deckName, setDeckName] = useState(initialDeckName);
    const router = useRouter();

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/decks/${deckId}`, { deckName });
            if (response.status === 200) {
                toast.success("Deck updated successfully!");
                onDeckUpdated();
            } else {
                toast.error("Unexpected response from the server.");
            }
        } catch (error) {
            toast.error("Error updating deck: " + error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/decks/${deckId}`);
            console.log("Deck deleted successfully");
            router.push('/decks');
        } catch (error) {
            console.log("Error deleting deck:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-left">Edit Deck</h1>
                <button
                    onClick={handleDelete}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <FaTrash />
                </button>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="mb-5">
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
                <div className="mb-2">
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    backward
                </button>
            </form>
        </div>
    )
}

export default EditDeckForm
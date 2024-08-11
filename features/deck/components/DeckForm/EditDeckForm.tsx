"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

interface DeckSettingsProps {
    deckId: string;
    deckName: string;
    onDeckUpdated: () => void;
}

const EditDeckForm: React.FC<DeckSettingsProps> = ({ deckId, deckName: initialDeckName, onDeckUpdated}) => {
    const [deckName, setDeckName] = useState(initialDeckName);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/decks/${deckId}`);
            toast.success("Deck deleted successfully!");
            router.push('/decks');
        } catch (error) {
            toast.error("Error deleting deck: " + error);
        } finally {
            setIsModalOpen(false);
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
                <div className="flex justify-between mb-2">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Backward
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </div>
            </form>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Confirm Delete"
                className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Confirm to delete</h2>
                    <p className="mb-4">Are you sure you want to delete this deck?</p>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
                        >
                            No
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditDeckForm
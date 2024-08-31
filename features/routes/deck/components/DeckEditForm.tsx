"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Common from "../../../common/components/index";
import DeckForm from './DeckForm';
import { DeckEditFormProps } from '../types/deck';

const EditDeckForm: React.FC<DeckEditFormProps> = ({ deckId, deckName: initialDeckName, onDeckUpdated }) => {
    const [deckName, setDeckName] = useState(initialDeckName);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Common.LoadingIndicator />;
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/deck/${deckId}`, { deckName });
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
            await axios.delete(`http://localhost:8080/api/deck/${deckId}`);
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
            <DeckForm deckName={deckName} onDeckNameChange={setDeckName} onSubmit={handleUpdate} />
            <Common.DeleteConfirmModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirmDelete={confirmDelete}
                targetWord="deck"
            />
        </div>
    );
};

export default EditDeckForm;
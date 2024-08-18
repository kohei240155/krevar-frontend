"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface DeckFormProps {
    onDeckCreated: () => void;
}

const DeckForm: React.FC<DeckFormProps> = ({ onDeckCreated }) => {
    const [deckName, setDeckName] = useState('');
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
    const router = useRouter();

    useEffect(() => {
        // ローディングをシミュレートするためのタイムアウト
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 1秒後にローディングを終了
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute top-0 mt-20 text-xl">Loading...</div>
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/decks', { deckName, userId: 1 });
            if (response.status === 200) {
                toast.success("Deck created successfully!");
                onDeckCreated();
            } else {
                toast.error("Unexpected response from the server.");
            }
        } catch (error) {
            toast.error("Error registering deck: " + error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-left">Add Deck</h1>
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
                <div className="flex justify-between mb-2">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        backward
                    </button>
                    <button
                        type="submit"
                        onClick={onDeckCreated}
                        className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeckForm;
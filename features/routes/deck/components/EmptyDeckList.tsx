import React from 'react';
import { useRouter } from 'next/navigation';

const EmptyDeckList: React.FC = () => {
    const router = useRouter();

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                <p className="text-gray-500 text-center mt-4 text-xl">No decks to display.</p>
                <div className="flex justify-center mt-10">
                    <button
                        className="w-1/2 inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => router.push('/decks/new')}
                    >
                        Add Deck
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyDeckList;
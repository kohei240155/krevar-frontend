"use client";
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { DeckFormProps } from '../types/deck';

const DeckForm: React.FC<DeckFormProps> = ({ deckName, onDeckNameChange, onSubmit, isEditMode, onDelete }) => {
    const router = useRouter();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-left">{isEditMode ? "Edit Deck" : "Add Deck"}</h1>
                {isEditMode && onDelete && (
                    <button
                        onClick={onDelete}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <FaTrash />
                    </button>
                )}
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-5">
                    <label htmlFor="deckName" className="block text-sm font-medium text-gray-700">
                        Deck Name:
                    </label>
                    <input
                        type="text"
                        id="deckName"
                        value={deckName}
                        onChange={(e) => onDeckNameChange(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-between mb-2">
                    <button
                        type="button"
                        onClick={() => router.push('/deck')}
                        className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Backward
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditMode ? "Update" : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeckForm;
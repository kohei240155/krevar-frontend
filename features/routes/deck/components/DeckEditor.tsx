"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Common from "../../../common/components/index";
import DeckForm from './DeckForm';
import { DeckEditorProps } from '../types/deck';

const DeckEditor: React.FC<DeckEditorProps> = ({ deckId, deckName: initialDeckName }) => {
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
                router.push('/deck');
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
            router.push('/deck');
        } catch (error) {
            toast.error("Error deleting deck: " + error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <DeckForm
                deckName={deckName}
                onDeckNameChange={setDeckName}
                onSubmit={handleUpdate}
                isEditMode={true}
                onDelete={handleDelete}
            />
            <Common.DeleteConfirmModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirmDelete={confirmDelete}
                targetWord="deck"
            />
        </>
    );
};

export default DeckEditor;
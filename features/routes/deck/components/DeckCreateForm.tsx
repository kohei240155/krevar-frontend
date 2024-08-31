"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { DeckFormProps } from '../types/deck';
import * as Common from "../../../common/components/index";
import DeckForm from './DeckForm';

const DeckCreateForm: React.FC<DeckFormProps> = ({ onDeckCreated }) => {
    const [deckName, setDeckName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Common.LoadingIndicator />
        );
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/deck',
                { deckName, userId: 1 },
                { withCredentials: true }
            );
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
        <DeckForm
            deckName={deckName}
            onDeckNameChange={setDeckName}
            onSubmit={handleSubmit}
            isEditMode={false}
        />
    );
}

export default DeckCreateForm;
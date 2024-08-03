import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Deck {
    id: number;
    deckName: string;
}

const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/api/decks")
            .then(response => response.json())
            .then(data => {
                setDecks(data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching decks:", error);
                setLoading(false);
            });
    }, []);

    const handleDeckClick = (deckId: number) => {
        router.push(`/quiz/${deckId}`);
    };

    if (loading) {
        return <p className="text-gray-500 text-center mt-4">Loading decks...</p>
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Deck List</h2>
            <ul className="space-y-4">
                {decks.map(deck => (
                    <li key={deck.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                        <span className="text-lg font-medium">{deck.deckName}</span>
                        <button onClick={() => handleDeckClick(deck.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">{deck.deckName}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DeckList;
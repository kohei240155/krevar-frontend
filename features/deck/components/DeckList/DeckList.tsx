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
        return <p>Loading decks...</p>
    }

    return (
        <div>
            <h2>Deck List</h2>
            <ul>
                {decks.map(deck => (
                    <li key={deck.id}>
                        {deck.deckName}
                        <button onClick={() => handleDeckClick(deck.id)}>{deck.deckName}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DeckList;
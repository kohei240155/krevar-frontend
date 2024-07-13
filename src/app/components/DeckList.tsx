import React, { useEffect, useState } from 'react'

interface Deck {
    id: number;
    deckName: string;
}

const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Loading decks...</p>
    }

    return (
        <div>
            <h2>Deck List</h2>
            <ul>
                {decks.map(deck => (
                    <li key={deck.id}>{deck.deckName}</li>
                ))}
            </ul>
        </div>
    )
}

export default DeckList;
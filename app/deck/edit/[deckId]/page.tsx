"use client"
import React from 'react'
import * as Deck from '../../../../features/routes/deck/components/index';
import { useParams, useSearchParams } from 'next/navigation';

const SettingsPage = () => {
  const params = useParams();
  const deckId = params?.deckId as string | undefined;
  const searchParams = useSearchParams();
  const deckName = searchParams?.get('deckName') || '';

  return (
    <div>
      <Deck.DeckEditor deckId={deckId as string} deckName={deckName} onDeckUpdated={() => {}} />
    </div>
  )
}

export default SettingsPage;
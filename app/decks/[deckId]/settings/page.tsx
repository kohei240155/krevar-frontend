"use client"
import React from 'react'
import * as Deck from '../../../../features/deck/components/Index';
import { useParams, useSearchParams } from 'next/navigation';

const SettingsPage = () => {
  const { deckId } = useParams();
  const searchParams = useSearchParams();
  const deckName = searchParams.get('deckName') || '';

  return (
    <div>
      <Deck.EditDeckForm deckId={deckId as string} deckName={deckName} onDeckUpdated={() => {}} />
    </div>
  )
}

export default SettingsPage;
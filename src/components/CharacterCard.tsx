import React from 'react';
import { Character } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
    character: Character;
    onToggleFavorite: () => void;
    isFavorite: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onToggleFavorite, isFavorite }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden">
            <Link href={`/character/${character.id}`}>
                <Image src={character.image} alt={character.name} width={300} height={300} />
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{character.name}</h2>
                    <button onClick={onToggleFavorite}>
                        {isFavorite ? '★' : '☆'}
                    </button>
                </div>
                <p>{character.status} - {character.species}</p>
                <p>Location: {character.location.name}</p>
            </div>
        </div>
    );
};

export default CharacterCard;

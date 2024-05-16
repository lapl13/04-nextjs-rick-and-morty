'use client';

import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '@/utils/api';
import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/utils/types';

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };
    getCharacters();
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const filteredCharacters = showFavorites
    ? characters.filter((character) => favorites.includes(character.id))
    : characters;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Rick and Morty Characters</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? 'Show All Characters' : 'Show Only Favorites'}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onToggleFavorite={() => toggleFavorite(character.id)}
            isFavorite={favorites.includes(character.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

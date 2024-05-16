// src/utils/api.ts
import { Character } from './types';

export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();
  return data.results;
};

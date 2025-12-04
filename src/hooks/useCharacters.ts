import { useEffect, useState } from 'react';
import { HPapi } from '../api/hpApi';
import { hpPhotoAPI } from '../api/photoApi';
import type { Character } from '../types/HPCharacter';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await HPapi.getAllCharct();
        setCharacters(data);
      } catch {
        setError('Ошибка загрузки персонажей');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const loadMore = () => setVisible(v => v + 12);

  const openModal = async (char: Character) => {
    setModalCharacter(char);
    const photo = (await hpPhotoAPI.getCharacterPhoto(char.name)) 
                  || (char.actor ? await hpPhotoAPI.getActorPhoto(char.actor) : null)
                  || hpPhotoAPI.createGreyCircle(char.name);
    setModalPhoto(photo);
  };

  const closeModal = () => {
    setModalCharacter(null);
    setModalPhoto(null);
  };

  return {
    characters: characters.slice(0, visible),
    loading,
    error,
    loadMore,
    openModal,
    closeModal,
    modalCharacter,
    modalPhoto,
    hasMore: visible < characters.length
  };
};

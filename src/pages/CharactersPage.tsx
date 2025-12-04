import { useEffect, useState } from "react";
import CharacterCard from "../components/Character/CharacterCard";
import CharacterModal from "../components/Character/CharacterModal";
import Header from '../components/Header/Header';
import type { Character } from "../types/HPCharacter";

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const charactersPerPage = 12;

  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://hp-api.onrender.com/api/characters");
      if (!res.ok) throw new Error("Failed to fetch characters");
      const data: Character[] = await res.json();
      setCharacters(data);
      setCurrentIndex(charactersPerPage);
    } catch (e: unknown) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const loadMore = () => {
    setCurrentIndex(prev => prev + charactersPerPage);
  };

return (
  <>
    <Header />  
    <div className="character__body">
      <h2 id="section1__title">The main characters</h2>
      {loading && <div id="loading">Loading...</div>}
      {error && <div id="error">{error}</div>}

      <div className="character_grid">
        {characters.slice(0, currentIndex).map(char => (
          <CharacterCard key={char.name} character={char} onClick={setModalCharacter} />
        ))}
      </div>

      {currentIndex < characters.length && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button className="load-more-button" onClick={loadMore}>Load More Characters</button>
        </div>
      )}

      <CharacterModal character={modalCharacter} onClose={() => setModalCharacter(null)} />
    </div>
  </>
);
}

export default CharactersPage;

import React, { useEffect, useState } from "react";
import { hpPhotoAPI } from "../../api/photoApi";
import closeIcon from '../../assets/images/akar-icons_cross.svg';
import type { Character } from "../../types/HPCharacter";


interface Props {
  character: Character | null;
  onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, onClose }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!character) return;

    const loadPhoto = async () => {
      let img = await hpPhotoAPI.getCharacterPhoto(character.name);
      if (!img && character.actor) img = await hpPhotoAPI.getActorPhoto(character.actor);
      if (!img) img = hpPhotoAPI.createGreyCircle(character.name);
      setPhoto(img);
    };
    loadPhoto();
  }, [character]);

  if (!character) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal_window">
        <div className="window_gen-nav">
          <img src={closeIcon} alt="close" className="cross" onClick={onClose} />
        </div>
        <div className="window_gen-inf">
          <div className="gen-inf__text">
            <span className="grid_name gen-inf__title">{character.name}</span>
            <span className="gen-inf__text-point">Date of birth: {character.dateOfBirth || "Unknown"}</span>
            <span className="gen-inf__text-point">Patronus: {character.patronus || "Unknown"}</span>
          </div>
          {photo && <img src={photo} alt={character.name} className="gen-inf__img" />}
        </div>
        <div className="sub-inf__text">
          <span className="gen-inf__text-point">Wand</span>
          <div className="sub-inf__points">
            <div>Wood: {character.wand?.wood || "Unknown"}</div>
            <div>Core: {character.wand?.core || "Unknown"}</div>
            <div>Length: {character.wand?.length || "Unknown"}</div>
          </div>
          <span className="gen-inf__text-point">Alternate names:</span>
          <div className="sub-inf__points">
            {character.alternate_names?.length ? character.alternate_names.join(", ") : "None"}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterModal;

import React, { useEffect, useState } from "react";
import { hpPhotoAPI } from "../../api/photoApi";
import type { Character } from "../../types/HPCharacter";

interface Props {
  character: Character;
  onClick: (char: Character) => void;
}

const houseClassMap: Record<string, string> = {
  Gryffindor: "gryffindor",
  Slytherin: "slytherin",
  Hufflepuff: "hufflepuff",
  Ravenclaw: "ravenclaw"
};

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      let img = await hpPhotoAPI.getCharacterPhoto(character.name);
      if (!img && character.actor) img = await hpPhotoAPI.getActorPhoto(character.actor);
      if (!img) img = hpPhotoAPI.createGreyCircle(character.name);
      setImage(img);
    };
    loadImage();
  }, [character]);

  if (!image) return null;

  const houseClass = character.house ? houseClassMap[character.house] || "" : "";

  return (
    <div className={`grid_content ${houseClass}`} onClick={() => onClick(character)}>
      <div className="grid_img-container">
        <img src={image} alt={character.name} className="grid_img" />
      </div>
      <div className="grid_divider"></div>
      <p className="grid_name">{character.name}</p>
      <p className="grid_house">{character.house || "Unknown"}</p>
      <p className="grid_actor">{character.actor || "Unknown actor"}</p>
    </div>
  );
};

export default CharacterCard;

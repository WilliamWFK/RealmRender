import React, { useState } from "react";
import '../styles/PlayerStatistics.css';

const PlayerStatistics = () => {
  const [characterSheetOpen, setCharacterSheetOpen] = useState(false);
  const [characterData, setCharacterData] = useState({
    classLevel: 'MMOR Class, 1st',
    race: 'Elf',
    background: 'Acolyte',
    name: 'Полевом',
    alignment: 'Lawful Good',
    experience: '0',
    strength: '10',
    dexterity: '14',
    constitution: '12',
    intelligence: '16',
    wisdom: '10',
    charisma: '13',
    savingThrows: 'Con, Int',
    tempHitPoints: '0',
    ac: '10',
    speed: '30 ft.',
    otherProfLang: 'Elvish, Common, Perception, Insight, History',
    equipment: 'Leather armor, dagger, shield, backpack, waterskin, 10 gp',
    featuresTraits: 'Elf Weapon Training, Darkvision, Fey Ancestry, Trance'
  });

  const handleButtonClick = () => {
    setCharacterSheetOpen(true);
  };

  const handleCharacterSheetClose = () => {
    setCharacterSheetOpen(false);
  };

  const handleChange = (field, value) => {
    setCharacterData({ ...characterData, [field]: value });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Open Character Sheet</button>
      {characterSheetOpen && (
        <div className="character-sheet">
          <h1>Character Sheet</h1>
          <table>
            <tbody>
              {Object.entries(characterData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                  <td>
                    <input
                      type="text"
                      value={value}
                      onChange={e => handleChange(key, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCharacterSheetClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PlayerStatistics;

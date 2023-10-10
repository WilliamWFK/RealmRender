import React, { useState } from "react";
import '../styles/PlayerStatistics.css';

const MonsterStatistics = () => {
  const [characterSheetOpen, setCharacterSheetOpen] = useState(false);
  const [characterData, setCharacterData] = useState({
    classLevel: 'MMOR Class, 1st',
    race: 'Medium Humanoid',
    background: 'Knight',
    name: 'Bullywug Knight',
    alignment: 'Lawful Good',
    experience: '0',
    strength: '11 (+0)',
    dexterity: '16 (+3)',
    constitution: '12 (+1)',
    intelligence: '13 (+1)',
    wisdom: '9 (-1)',
    charisma: '14 (+2)',
    savingThrows: 'Con +3, Wis +2',
    tempHitPoints: '0',
    ac: '18 (plate armor)',
    speed: '30 ft., swim 30 ft.',
    otherProfLang: 'Bullywug, Common, Perception, Insight, History',
    equipment: 'Glaive, plate armor, shield, backpack, waterskin, 10 gp',
    featuresTraits: 'Amphibious, Speak with Frogs and Toads, Standing Leap'
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

export default MonsterStatistics;

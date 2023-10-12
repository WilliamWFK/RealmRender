import React, { useState } from "react";
import '../styles/PlayerStatistics.css';

import Monster1 from './monster1.png';
import Monster2 from './monster2.png';
import Monster3 from './monster3.png';



class MonsterStatistics {
  static monsters = [null, null, null, null, null, null];

  constructor(monsterId) {
    this.stats = {};
    this.monsterId = monsterId;
    this.populateStats();
    MonsterStatistics.monsters[monsterId] = this;
  }

  populateStats() {
    this.stats["classLevel"] = 'MMOR Class, 1st';
    this.stats["race"] = 'Goblin';
    this.stats["background"] = 'Beast';
    this.stats["name"] = 'Gobbo';
    this.stats["alignment"] = 'Neutral Evil';
    this.stats["experience"] = '0';
    this.stats["strength"] = '8';
    this.stats["dexterity"] = '14';
    this.stats["constitution"] = '10';
    this.stats["intelligence"] = '10';
    this.stats["wisdom"] = '8';
    this.stats["charisma"] = '8';
    this.stats["savingThrows"] = 'Dex';
    this.stats["tempHitPoints"] = '0';
    this.stats["ac"] = '15';
    this.stats["speed"] = '30 ft.';
    this.stats["otherProfLang"] = 'Common, Goblin';
    this.stats["equipment"] = 'Shortsword, Leather Armor';
    this.stats["featuresTraits"] = 'Nimble Escape';

    if(this.monsterId === 1){
      this.stats["classLevel"] = 'Dragon, Young';
      this.stats["race"] = 'Dragon';
      this.stats["background"] = 'Dragon';
      this.stats["name"] = 'Smauglet';
      this.stats["alignment"] = 'Chaotic Evil';
      this.stats["experience"] = '0';
      this.stats["strength"] = '19';
      this.stats["dexterity"] = '10';
      this.stats["constitution"] = '17';
      this.stats["intelligence"] = '14';
      this.stats["wisdom"] = '11';
      this.stats["charisma"] = '15';
      this.stats["savingThrows"] = 'Dex, Con, Wis, Cha';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '18';
      this.stats["speed"] = '40 ft, fly 80 ft.';
      this.stats["otherProfLang"] = 'Draconic';
      this.stats["equipment"] = 'None';
      this.stats["featuresTraits"] = 'Legendary Resistance, Dragon Breath';
    }
    if(this.monsterId === 2){
        this.stats["classLevel"] = 'Skeleton, 1st';
        this.stats["race"] = 'Undead';
        this.stats["background"] = 'Undead';
        this.stats["name"] = 'Skully';
        this.stats["alignment"] = 'Lawful Evil';
        this.stats["experience"] = '0';
        this.stats["strength"] = '10';
        this.stats["dexterity"] = '14';
        this.stats["constitution"] = '15';
        this.stats["intelligence"] = '6';
        this.stats["wisdom"] = '8';
        this.stats["charisma"] = '5';
        this.stats["savingThrows"] = 'Dex';
        this.stats["tempHitPoints"] = '0';
        this.stats["ac"] = '13';
        this.stats["speed"] = '30 ft.';
        this.stats["otherProfLang"] = 'None';
        this.stats["equipment"] = 'Shortsword, Shortbow';
        this.stats["featuresTraits"] = 'Vulnerability to Bludgeoning';
      }

      if(this.monsterId === 3){
        this.stats["classLevel"] = 'Ogre, 1st';
        this.stats["race"] = 'Giant';
        this.stats["background"] = 'Giant';
        this.stats["name"] = 'Oggie';
        this.stats["alignment"] = 'Chaotic Neutral';
        this.stats["experience"] = '0';
        this.stats["strength"] = '19';
        this.stats["dexterity"] = '8';
        this.stats["constitution"] = '16';
        this.stats["intelligence"] = '5';
        this.stats["wisdom"] = '7';
        this.stats["charisma"] = '7';
        this.stats["savingThrows"] = 'Con';
        this.stats["tempHitPoints"] = '0';
        this.stats["ac"] = '11';
        this.stats["speed"] = '40 ft.';
        this.stats["otherProfLang"] = 'Giant';
        this.stats["equipment"] = 'Greatclub, Javelin';
        this.stats["featuresTraits"] = 'None';
      }

      if(this.monsterId === 4){
        this.stats["classLevel"] = 'Beholder, 1st';
        this.stats["race"] = 'Aberration';
        this.stats["background"] = 'Aberration';
        this.stats["name"] = 'EyeSeeU';
        this.stats["alignment"] = 'Lawful Evil';
        this.stats["experience"] = '0';
        this.stats["strength"] = '10';
        this.stats["dexterity"] = '14';
        this.stats["constitution"] = '18';
        this.stats["intelligence"] = '17';
        this.stats["wisdom"] = '15';
        this.stats["charisma"] = '17';
        this.stats["savingThrows"] = 'Int, Wis, Cha';
        this.stats["tempHitPoints"] = '0';
        this.stats["ac"] = '18';
        this.stats["speed"] = '0 ft., fly 20 ft.';
        this.stats["otherProfLang"] = 'Deep Speech';
        this.stats["equipment"] = 'None';
        this.stats["featuresTraits"] = 'Eye Rays, Anti-Magic Cone';
      }

      if(this.monsterId === 5){
        this.stats["classLevel"] = 'Lich, 1st';
        this.stats["race"] = 'Undead';
        this.stats["background"] = 'Mage';
        this.stats["name"] = 'Lichy';
        this.stats["alignment"] = 'Neutral Evil';
        this.stats["experience"] = '0';
        this.stats["strength"] = '11';
        this.stats["dexterity"] = '16';
        this.stats["constitution"] = '16';
        this.stats["intelligence"] = '20';
        this.stats["wisdom"] = '14';
        this.stats["charisma"] = '16';
        this.stats["savingThrows"] = 'Con, Int, Wis';
        this.stats["tempHitPoints"] = '0';
        this.stats["ac"] = '17';
        this.stats["speed"] = '30 ft.';
        this.stats["otherProfLang"] = 'Common, Infernal';
        this.stats["equipment"] = 'Staff of Power';
        this.stats["featuresTraits"] = 'Spellcasting, Legendary Resistance';
      }

    // Add more monster stats by copying the pattern above
  }


  returnSheet() {
    let p5 = document.getElementById("P5Wrapper");

    for (let i = 0; i < 6; i++) {
      let existingMonsterSheet = document.getElementById("monster-sheet" + i);
      if (existingMonsterSheet) {
        for (let key in this.stats) {
          let statElement = document.getElementById(key);
          if (statElement && MonsterStatistics.monsters[i]) {
            MonsterStatistics.monsters[i].stats[key] = statElement.innerHTML;
          }
        }
        p5.removeChild(existingMonsterSheet);
        break;
      }
    }

    if(p5.childNodes.length > 1) p5.removeChild(p5.childNodes[1]);

    let sheet = document.createElement("div");
    sheet.id = "monster-sheet" + this.monsterId;
    // You can modify the logic for background images based on monsterId
    sheet.style.backgroundSize = '60px';
    sheet.style.backgroundRepeat = 'no-repeat';
    sheet.style.backgroundPositionX = '80%';
    sheet.style.backgroundPositionY = '6%';

    let monsterID = "Monster " + (this.monsterId+1) + ": " + this.stats["name"];
    sheet.className = "monster-sheet";
    sheet.innerHTML = "<h1>"+monsterID+"</h1>";

    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    for (let key in this.stats) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        td2.innerHTML = this.stats[key];
        td2.id = key;

        td2.setAttribute("contenteditable", "true");
        td2.setAttribute("spellcheck", "false");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        td2.addEventListener("keydown", function(event) {
          if (event.key === ("Enter")) {
              event.preventDefault();
              td2.blur();

          }
      });

      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    sheet.appendChild(table);


    let button = document.createElement("button");
    button.id = "close-sheet";
    button.innerHTML = "X";
    button.addEventListener("click", () => {
        for (let key in this.stats) {
            this.stats[key] = document.getElementById(key).innerHTML;
        }
        document.getElementById("P5Wrapper").removeChild(sheet);
    }, {once : true});

    sheet.appendChild(button);


    p5.appendChild(sheet);
}
}

export default MonsterStatistics;

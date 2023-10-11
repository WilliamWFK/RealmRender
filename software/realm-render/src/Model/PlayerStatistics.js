import React, { useState } from "react";
import '../styles/PlayerStatistics.css';


class PlayerStatistics {
  static players = [null, null, null, null, null, null];

  constructor(playerId) {
    this.stats = {};
    this.playerId = playerId;
    this.populateStats();
    PlayerStatistics.players[playerId] = this;
  }

  populateStats() {
    this.stats["classLevel"] = 'MMOR Class, 1st';
    this.stats["race"] = 'Elf';
    this.stats["background"] = 'Acolyte';
    this.stats["name"] = 'Полевом';
    this.stats["alignment"] = 'Lawful Good';
    this.stats["experience"] = '0';
    this.stats["strength"] = '10';
    this.stats["dexterity"] = '14';
    this.stats["constitution"] = '12';
    this.stats["intelligence"] = '16';
    this.stats["wisdom"] = '10';
    this.stats["charisma"] = '13';
    this.stats["savingThrows"] = 'Con, Int';
    this.stats["tempHitPoints"] = '0';
    this.stats["ac"] = '10';
    this.stats["speed"] = '30 ft.';
    this.stats["otherProfLang"] = 'Elvish, Common, Perception, Insight, History';
    this.stats["equipment"] = 'Leather armor, dagger, shield, backpack, waterskin, 10 gp';
    this.stats["featuresTraits"] = 'Elf Weapon Training, Darkvision, Fey Ancestry, Trance';
  }


  returnSheet() {
    let p5 = document.getElementById("P5Wrapper");

    for (let i = 0; i < 6; i++) {
      let existingPlayerSheet = document.getElementById("character-sheet" + i);
      if (existingPlayerSheet) {
        for (let key in this.stats) {
          let statElement = document.getElementById(key);
          if (statElement && PlayerStatistics.players[i]) {
            PlayerStatistics.players[i].stats[key] = statElement.innerHTML;
          }
        }
        p5.removeChild(existingPlayerSheet);
        break;
      }
    }

    if(p5.childNodes.length > 1) p5.removeChild(p5.childNodes[1]);

    let sheet = document.createElement("div");
    sheet.id = "character-sheet" + this.playerId;
    let PlayerID = "Player " + this.playerId + ": " + this.stats["name"];
    sheet.className = "character-sheet";
    sheet.innerHTML = "<h1>"+PlayerID+"</h1>";

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

export default PlayerStatistics;

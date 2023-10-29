import '../styles/PlayerStatistics.css';

//import p5 js






class PlayerStatistics {
  static players = [null, null, null, null, null, null];

  constructor(playerId) {
    this.stats = {};
    this.playerId = playerId;
    this.populateStats();
    PlayerStatistics.players[playerId] = this;
  }

  populateStats() {
    this.stats["classLevel"] = 'Knight, 1st';
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
    if(this.playerId==1){
      this.stats["classLevel"] = 'Rogue, 1st';
      this.stats["race"] = 'Half-Orc';
      this.stats["background"] = 'Outlander';
      this.stats["name"] = 'Thordan';
      this.stats["alignment"] = 'Chaotic Neutral';
      this.stats["experience"] = '0';
      this.stats["strength"] = '17';
      this.stats["dexterity"] = '13';
      this.stats["constitution"] = '16';
      this.stats["intelligence"] = '8';
      this.stats["wisdom"] = '10';
      this.stats["charisma"] = '9';
      this.stats["savingThrows"] = 'Str, Con';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '13';
      this.stats["speed"] = '30 ft.';
      this.stats["otherProfLang"] = 'Common, Orc, Athletics, Survival';
      this.stats["equipment"] = 'Greataxe, handaxe, explorer\'s pack, 10 gp';
      this.stats["featuresTraits"] = 'Darkvision, Relentless Endurance, Savage Attacks';
    }
    if(this.playerId==2){
      this.stats["classLevel"] = 'Wizard, 1st';
      this.stats["race"] = 'Halfling';
      this.stats["background"] = 'Criminal';
      this.stats["name"] = 'Elara';
      this.stats["alignment"] = 'Neutral';
      this.stats["experience"] = '0';
      this.stats["strength"] = '9';
      this.stats["dexterity"] = '16';
      this.stats["constitution"] = '12';
      this.stats["intelligence"] = '14';
      this.stats["wisdom"] = '10';
      this.stats["charisma"] = '12';
      this.stats["savingThrows"] = 'Dex, Int';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '14';
      this.stats["speed"] = '25 ft.';
      this.stats["otherProfLang"] = 'Common, Halfling, Stealth, Deception';
      this.stats["equipment"] = 'Shortsword, shortbow, leather armor, thieves\' tools, 10 gp';
      this.stats["featuresTraits"] = 'Lucky, Brave, Halfling Nimbleness, Sneak Attack';
    }
    if(this.playerId==3){
      this.stats["classLevel"] = 'Knight, 1st';
      this.stats["race"] = 'Dwarf';
      this.stats["background"] = 'Acolyte';
      this.stats["name"] = 'Seraphina';
      this.stats["alignment"] = 'Lawful Good';
      this.stats["experience"] = '0';
      this.stats["strength"] = '12';
      this.stats["dexterity"] = '10';
      this.stats["constitution"] = '16';
      this.stats["intelligence"] = '10';
      this.stats["wisdom"] = '16';
      this.stats["charisma"] = '10';
      this.stats["savingThrows"] = 'Wis, Cha';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '16';
      this.stats["speed"] = '25 ft.';
      this.stats["otherProfLang"] = 'Common, Dwarvish, Religion, Insight';
      this.stats["equipment"] = 'Warhammer, shield, chain mail, holy symbol, 10 gp';
      this.stats["featuresTraits"] = 'Dwarven Resilience, Stonecunning, Divine Domain';
    }
    if(this.playerId==4){
      this.stats["classLevel"] = 'Rogue, 1st';
      this.stats["race"] = 'Gnome';
      this.stats["background"] = 'Sage';
      this.stats["name"] = 'Nim';
      this.stats["alignment"] = 'Chaotic Good';
      this.stats["experience"] = '0';
      this.stats["strength"] = '8';
      this.stats["dexterity"] = '12';
      this.stats["constitution"] = '14';
      this.stats["intelligence"] = '17';
      this.stats["wisdom"] = '10';
      this.stats["charisma"] = '10';
      this.stats["savingThrows"] = 'Int, Wis';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '11';
      this.stats["speed"] = '25 ft.';
      this.stats["otherProfLang"] = 'Common, Gnomish, Arcana, History';
      this.stats["equipment"] = 'Quarterstaff, spellbook, arcane focus, scholar\'s pack, 10 gp';
      this.stats["featuresTraits"] = 'Gnome Cunning, Darkvision, Spellcasting';
    }
    if(this.playerId==5){
      this.stats["classLevel"] = 'Wizard, 1st';
      this.stats["race"] = 'Human';
      this.stats["background"] = 'Entertainer';
      this.stats["name"] = 'Lyra';
      this.stats["alignment"] = 'Neutral Good';
      this.stats["experience"] = '0';
      this.stats["strength"] = '10';
      this.stats["dexterity"] = '14';
      this.stats["constitution"] = '12';
      this.stats["intelligence"] = '12';
      this.stats["wisdom"] = '10';
      this.stats["charisma"] = '16';
      this.stats["savingThrows"] = 'Dex, Cha';
      this.stats["tempHitPoints"] = '0';
      this.stats["ac"] = '12';
      this.stats["speed"] = '30 ft.';
      this.stats["otherProfLang"] = 'Common, Elvish, Performance, Acrobatics';
      this.stats["equipment"] = 'Rapier, leather armor, lute, backpack, 10 gp';
      this.stats["featuresTraits"] = 'Bardic Inspiration, Spellcasting';
    }
  }


  returnSheet() {
    let P5Wrapper = document.getElementById("P5Wrapper");

    for (let i = 0; i < 6; i++) {
      let existingPlayerSheet = document.getElementById("character-sheet" + i);
      if (existingPlayerSheet) {
        for (let key in this.stats) {
          let statElement = document.getElementById(key);
          if (statElement && PlayerStatistics.players[i]) {
            PlayerStatistics.players[i].stats[key] = statElement.innerHTML;
          }
        }
        P5Wrapper.removeChild(existingPlayerSheet);
        break;
      }
    }

    if(P5Wrapper.childNodes.length > 1) P5Wrapper.removeChild(P5Wrapper.childNodes[1]);

    let sheet = document.createElement("div");
    sheet.className = "character-sheet";
    sheet.id = "character-sheet" + this.playerId;



    //Add the style


    let table = document.createElement("table");
    table.className = "sheet-table";
    let tbody = document.createElement("tbody");
    let h1 = document.createElement("h1");


    h1.style.backgroundImage = `url(${"TilesImg/player1.png"})`;

    if(this.stats["classLevel"].includes("Knight")){
      h1.style.backgroundImage = `url(${"TilesImg/player3.png"})`
    }
    if(this.stats["classLevel"].includes("Rogue")){
      h1.style.backgroundImage = `url(${"TilesImg/player4.png"})`
    }
    if(this.stats["classLevel"].includes("Wizard")){
      h1.style.backgroundImage = `url(${"TilesImg/player5.png"})`
    }



    h1.style.backgroundSize = '50px';
    h1.style.backgroundRepeat = 'no-repeat';
    h1.style.backgroundPositionX = '95%';
    h1.style.backgroundPositionY = '0%';
    h1.textContent = "Player " + (this.playerId+1) + ": " + this.stats["name"];
    tbody.appendChild(h1);

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


    P5Wrapper.appendChild(sheet);
}
}

export default PlayerStatistics;

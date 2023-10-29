import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, update, set } from "firebase/database";
import firebaseConfig from "../firebaseConfig.js";

class RTDbObject {
    constructor(gameId) {
        this.gameId = gameId;
        // intialize app
        this.app = initializeApp(firebaseConfig);
        this.db = getDatabase(this.app);
        // this.update();
    }

    createMapListener(callback) {
        const mapReference = ref(this.db, 'maps/' + this.gameId);
        onValue(mapReference, (snapshot) => {
            const tiles = snapshot.val();
            callback(tiles);
            console.log("Map update received");
            console.log(tiles);
        });
    }

    createEntityListener(callback) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/otherEntities");
        onValue(entityReference, (snapshot) => {
            const entities = snapshot.val();
            callback(entities);
            console.log("Entity update received");
            console.log(entities);
        });
    }

    createPlayerListener(callback) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/players");
        onValue(entityReference, (snapshot) => {
            const player = snapshot.val();
            callback(player);
            console.log("Player update received");
            console.log(player);
        });
    }

    getGameData() {
        const gameReference = ref(this.db, 'games/' + this.gameId);
        get(gameReference).then((snapshot) => {
            if (snapshot.exists()) {
                const game = snapshot.val();
                console.log("Game data retrieved");
                console.log(game);
                return game;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }



    createGameListener(callback) {
        const gameReference = ref(this.db, 'games/' + this.gameId);
        onValue(gameReference, (snapshot) => {
            const game = snapshot.val();
            callback(game);
            console.log("Game update received");
            console.log(game);
        });
    }

    updateMapData(map) {
        const mapReference = ref(this.db, 'maps/' + this.gameId);
        update(mapReference, {
            tiles: map
        });
        console.log("Map updated");
    }

    updateEntityData(entity) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/otherEntities");
        update(entityReference, {
            entities: entity.entities
        });
        console.log("Entities updated");
    }

    updatePlayerData(player) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/players");
        update(entityReference, {
            player: player
        });
        console.log("Player updated");
    }

    updateGameData(game) {
        const gameReference = ref(this.db, 'games/' + this.gameId);
        update(gameReference, {
            game: game.game
        });
        console.log("Game updated");
    }

    createNewGame(game) {
        const gameReference = ref(this.db, 'games/' + this.gameId);
        set(gameReference, {
            game: game
        });
        console.log("Game created");
    }

    createNewMap(map) {
        const mapReference = ref(this.db, 'maps/' + this.gameId);
        set(mapReference, {
            tiles: map.tiles
        });
        console.log("Map created");
    }

    createNewEntity(entity) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/otherEntities");
        set(entityReference, {
            entities: entity.entities
        });
        console.log("Entities created");
    }

    createNewPlayer(player) {
        const entityReference = ref(this.db, 'entities/' + this.gameId + "/players");
        set(entityReference, {
            player: player
        });
        console.log("Player created");
    }
}

export default RTDbObject;
// function writeMapData(gameId, map) {
//     const db = getDatabase();
//     const reference = ref(db, 'maps/' + mapId);

//     set (reference, {
//         tiles: map.tiles
//     });

// }

// function writeEntityData(gameId, entity) {

// }

// function writeGameData(gameId, game) {

// }

// export default function getMapData(gameId) {
//     const db = getDatabase();
//     const mapReference = ref(db, 'maps/' + gameId);
//     onValue(mapReference, (snapshot) => {
//         const tSiles = snapshot.val();
//         updateMap(postElement, tiles);
//     });
// }

// export default function getEntityData(gameId) {
//     const db = getDatabase();
//     const entityReference = ref(db, 'entities/' + gameId);
//     onValue(entityReference, (snapshot) => {
//         const entities = snapshot.val();
//         updateEntity(postElement, entities);
//     });
// }

// export default function getGameData(gameId) {
//     const db = getDatabase();
//     const gameReference = ref(db, 'games/' + gameId);
//     onValue(gameReference, (snapshot) => {
//         const game = snapshot.val();
//         updateGame(postElement, game);
//     });
// }

// function updateMap(postElement, tiles) {
//     postElement.innerText = JSON.stringify(tiles);

// }

// function updateEntity(postElement, entities) {
//     postElement.innerText = JSON.stringify(entities);

// }

// function updateGame(postElement, game) {
//     postElement.innerText = JSON.stringify(game);
//     // change the state of the game

//     // update the map

// }

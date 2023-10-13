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

    createEntityListener(gameId, callback) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/otherEntities");
        onValue(entityReference, (snapshot) => {
            const entities = snapshot.val();
            callback(entities);
            console.log("Entity update received");
            console.log(entities);
        });
    }

    createPlayerListener(gameId, callback) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/players");
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



    createGameListener(gameId, callback) {
        const gameReference = ref(this.db, 'games/' + gameId);
        onValue(gameReference, (snapshot) => {
            const game = snapshot.val();
            callback(game);
            console.log("Game update received");
            console.log(game);
        });
    }

    updateMapData(gameId, map) {
        const mapReference = ref(this.db, 'maps/' + gameId);
        update(mapReference, {
            tiles: map.tiles
        });
        console.log("Map updated");
    }

    updateEntityData(gameId, entity) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/otherEntities");
        update(entityReference, {
            entities: entity.entities
        });
        console.log("Entities updated");
    }

    updatePlayerData(gameId, player) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/players");
        update(entityReference, {
            player: player
        });
        console.log("Player updated");
    }

    updateGameData(gameId, game) {
        const gameReference = ref(this.db, 'games/' + gameId);
        update(gameReference, {
            game: game.game
        });
        console.log("Game updated");
    }

    createNewGame(gameId, game) {
        const gameReference = ref(this.db, 'games/' + gameId);
        set(gameReference, {
            game: game
        });
        console.log("Game created");
    }

    createNewMap(gameId, map) {
        const mapReference = ref(this.db, 'maps/' + gameId);
        set(mapReference, {
            tiles: map.tiles
        });
        console.log("Map created");
    }

    createNewEntity(gameId, entity) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/otherEntities");
        set(entityReference, {
            entities: entity.entities
        });
        console.log("Entities created");
    }

    createNewPlayer(gameId, player) {
        const entityReference = ref(this.db, 'entities/' + gameId + "/players");
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

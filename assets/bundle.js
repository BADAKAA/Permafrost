(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    //These variables control audio playback time and are responsible for deactivating user input while non-ambient audio is playing.
    let remainingPlayBack = 0;
    function audioLength(duration) {
        remainingPlayBack = duration * 1000;
        const playback = setInterval(function counter() {
            remainingPlayBack = remainingPlayBack - 100;
            if (remainingPlayBack < 100) {
                remainingPlayBack = 0;
                clearInterval(playback);
            }
        }, 100);
    }
    //enable audio output
    class Sound {
        constructor(src) {
            this.stop = () => this.sound.pause();
            this.duration = () => this.sound.duration * 1000;
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function (background) {
                adjustVolume(this.sound, 1);
                this.sound.play();
                if (background)
                    return audioLength(5);
                audioLength(this.sound.duration);
            };
            this.fade = function () {
                adjustVolume(this.sound, 0);
                setTimeout(() => this.sound.pause(), 3000);
            };
        }
    }
    //Fading function taken from: https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
    function adjustVolume(element, newVolume, { duration = 1000, easing = swing, interval = 13, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalVolume = element.volume;
            const delta = newVolume - originalVolume;
            if (!delta || !duration || !easing || !interval) {
                element.volume = newVolume;
                return Promise.resolve();
            }
            const ticks = Math.floor(duration / interval);
            let tick = 1;
            return new Promise(resolve => {
                const timer = setInterval(() => {
                    element.volume = originalVolume + (easing(tick / ticks) * delta);
                    if (++tick === ticks + 1) {
                        clearInterval(timer);
                        resolve();
                    }
                }, interval);
            });
        });
    }
    function swing(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    }

    const gameObjects = [
        //items
        { name: 'flask', type: 'item', sound: [new Sound('assets/sound/player/item/flask.ogg'), new Sound('assets/sound/player/item/flask2.ogg')] },
        { name: 'crowbar', type: 'item', sound: [new Sound('assets/sound/player/item/crowbar.ogg'), new Sound('assets/sound/player/item/crowbar2.ogg')] },
        { name: 'food', type: 'item', sound: [new Sound('assets/sound/player/item/food.ogg'), new Sound('assets/sound/player/item/food2.ogg')] },
        { name: 'bottle', type: 'item', sound: [new Sound('assets/sound/player/item/bottle.ogg'), new Sound('assets/sound/player/item/bottle2.ogg')] },
        { name: 'pipette', type: 'item', sound: [new Sound('assets/sound/player/item/pipette.ogg'), new Sound('assets/sound/player/item/pipette2.ogg')] },
        { name: 'mediKit', type: 'item', sound: [new Sound('assets/sound/player/item/mediKit.ogg'), new Sound('assets/sound/player/item/mediKit2.ogg')] },
        { name: 'disk', type: 'item', sound: [new Sound('assets/sound/player/item/disk.ogg'), new Sound('assets/sound/player/item/disk2.ogg')] },
        //objects
        { name: 'testTube', type: 'object', sound: [new Sound('assets/sound/player/object/testTube.ogg'), new Sound('assets/sound/player/object/testTube2.ogg')] },
        { name: 'suits', type: 'object', sound: [new Sound('assets/sound/player/object/suits.ogg'), new Sound('assets/sound/player/object/suits2.ogg')] },
        { name: 'captain', type: 'object', sound: [new Sound('assets/sound/player/object/captain.ogg')] },
        { name: 'slit', type: 'object', sound: [new Sound('assets/sound/player/object/slit.ogg'), new Sound('assets/sound/player/object/slit2.ogg')] },
    ];
    const rooms = [
        //rooms
        { name: 'hallway1', locked: true, type: 'room', options: ['cafeteria', 'wardrobe', 'slit', 'lab', 'hallway2'], sound: [new Sound('assets/sound/player/room/door.ogg'), new Sound('assets/sound/player/room/floor1.ogg')] },
        { name: 'hallway2', locked: true, type: 'room', options: ['lockedRoom', 'lockedDoor', 'bridge', 'hallway1'], sound: [new Sound('assets/sound/player/room/securityDoor2.ogg'), new Sound('assets/sound/player/room/securityDoor.ogg')] },
        { name: 'lab', locked: false, type: 'room', options: ['crowbar', 'flask', 'pipette', 'testTube', 'hallway1'], sound: [new Sound('assets/sound/player/room/lab.ogg'), new Sound('assets/sound/player/room/lab2.ogg')] },
        { name: 'cafeteria', locked: false, type: 'room', options: ['mediKit', 'food', 'bottle', 'hallway1'], sound: [new Sound('assets/sound/player/room/cafeteria.ogg')] },
        { name: 'wardrobe', locked: false, type: 'room', options: ['suits', 'disk', 'hallway1'], sound: [new Sound('assets/sound/player/room/wardrobe.ogg')] },
        { name: 'bridge', locked: false, type: 'room', options: ['captain', 'hallway1'], sound: [new Sound('assets/sound/player/room/bridge.ogg')] },
        { name: 'lockedRoom', locked: true, type: 'room', options: [], sound: [new Sound('assets/sound/player/room/lockedR.ogg')] },
        { name: 'lockedDoor', locked: true, type: 'room', options: [], sound: [new Sound('assets/sound/player/room/lockedD.ogg')] },
    ];
    function getGameObject(name) {
        var _a, _b;
        return (_b = (_a = gameObjects.find(o => o.name === name)) !== null && _a !== void 0 ? _a : rooms.find(r => r.name === name)) !== null && _b !== void 0 ? _b : gameObjects[0];
    }

    const score = new Sound("assets/sound/music/opening.ogg");
    const ambience = new Sound("assets/sound/music/ambience.ogg");
    // These JSON-objects store sound data.
    const AI = {
        "fear": new Sound("assets/sound/AI/fear.ogg"),
        "tutorialStart": new Sound("assets/sound/AI/tutorialStart.ogg"),
        "talented": new Sound("assets/sound/AI/talented.ogg"),
        "wrongKey": new Sound("assets/sound/AI/wrongKey.ogg"),
        "enterObject": new Sound("assets/sound/AI/enterObject.ogg"),
        "fillTestTube": new Sound("assets/sound/AI/fillTestTube.ogg"),
        "flaskInBag": new Sound("assets/sound/AI/flaskInBag.ogg"),
        "spaceBarObject": new Sound("assets/sound/AI/spaceBarObject.ogg"),
        "funny": new Sound("assets/sound/AI/funny.ogg"),
        "shutDown": new Sound("assets/sound/AI/shutDown.ogg"),
        "arrowKeyYes": new Sound("assets/sound/AI/arrowKeyYes.ogg"),
        "arrowKeyLook": new Sound("assets/sound/AI/arrowKeyLook.ogg"),
        "startProgram": new Sound("assets/sound/AI/startProgram.ogg"),
        "spacebarFlask": new Sound("assets/sound/AI/spacebarFlask.ogg"),
        "pity": new Sound("assets/sound/AI/pity.ogg"),
        "well": new Sound("assets/sound/AI/well.ogg"),
        "bag": new Sound("assets/sound/AI/bag.ogg"),
        "tutorialFinish": new Sound("assets/sound/AI/tutorialFinish.ogg"),
    };
    const sfx = {
        "AIRestored": new Sound("assets/sound/sfx/AIRestored.ogg"),
        "door": new Sound("assets/sound/sfx/door.ogg"),
        "open": new Sound("assets/sound/sfx/open.ogg"),
        "close": new Sound("assets/sound/sfx/close.ogg"),
        "empty": new Sound("assets/sound/sfx/empty.ogg"),
        "cannotTake": new Sound("assets/sound/sfx/cannotTake.ogg"),
        "zipper": new Sound("assets/sound/sfx/zipper.ogg"),
        "locked": new Sound("assets/sound/sfx/locked.ogg"),
        "took": new Sound("assets/sound/sfx/took.ogg"),
        "activated": new Sound("assets/sound/sfx/activated.ogg"),
        "pour": new Sound("assets/sound/sfx/pour.ogg"),
        "quicktime": new Sound("assets/sound/sfx/quicktime.ogg"),
        "openUp": new Sound("assets/sound/sfx/openUp.ogg"),
        "grunt": new Sound("assets/sound/sfx/grunt.ogg"),
        "yes": new Sound("assets/sound/sfx/yes.ogg"),
        "no": new Sound("assets/sound/sfx/no.ogg"),
        "gameOver": new Sound("assets/sound/sfx/gameOver.ogg"),
        "captain": new Sound("assets/sound/sfx/captain.ogg")
    };

    var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };
    var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };
    var _items, _position, _active;
    class Inventory {
        constructor() {
            _items.set(this, []);
            _position.set(this, 0);
            _active.set(this, false);
            this.isActive = () => __classPrivateFieldGet(this, _active);
            this.print = () => console.log("Inventory", __classPrivateFieldGet(this, _items).map(i => i.name));
            this.length = () => __classPrivateFieldGet(this, _items).length;
            this.get = (index) => __classPrivateFieldGet(this, _items)[index];
            this.getSelected = () => __classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _position)];
            this.getLast = () => __classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _items).length - 1];
            this.push = (o) => __classPrivateFieldGet(this, _items).push(o);
            this.removeCurrent = () => __classPrivateFieldGet(this, _items).splice(__classPrivateFieldGet(this, _position), 1);
        }
        movePosition(direction) {
            var _a, _b;
            if (direction == "right") {
                return __classPrivateFieldGet(this, _position) === 0 ? __classPrivateFieldSet(this, _position, __classPrivateFieldGet(this, _items).length - 1) : (__classPrivateFieldSet(this, _position, (_a = +__classPrivateFieldGet(this, _position)) - 1), _a);
            }
            __classPrivateFieldGet(this, _position) === __classPrivateFieldGet(this, _items).length - 1 ? __classPrivateFieldSet(this, _position, 0) : (__classPrivateFieldSet(this, _position, (_b = +__classPrivateFieldGet(this, _position)) + 1), _b);
        }
        move(direction) {
            if (__classPrivateFieldGet(this, _items).length === 0) {
                console.log("Meine Tasche ist leer.");
                return sfx.empty.play();
            }
            this.movePosition(direction);
            console.log("Hand:", __classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _position)].name);
            if (__classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _position)].type !== "item")
                return; // why is this necessary?
            __classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _position)].sound[0].play();
        }
        open() {
            if (__classPrivateFieldGet(this, _active))
                return;
            this.print();
            __classPrivateFieldSet(this, _active, true);
            __classPrivateFieldSet(this, _position, 0);
            sfx.open.play();
            const itemCount = __classPrivateFieldGet(this, _items).length;
            const selection = __classPrivateFieldGet(this, _items)[__classPrivateFieldGet(this, _position)];
            setTimeout(() => {
                if (itemCount <= 0)
                    return sfx.empty.play();
                selection.sound[0].play();
            }, sfx.open.duration());
        }
        close() {
            if (!__classPrivateFieldGet(this, _active))
                return console.warn("Inventory is already closed.");
            __classPrivateFieldSet(this, _active, false);
            sfx.close.play();
        }
    }
    _items = new WeakMap(), _position = new WeakMap(), _active = new WeakMap();
    const I = new Inventory();

    class Game {
        constructor() {
            this.tutorialMode = false;
            this.hand = null;
            this.selectionNumber = 0;
            //inventory
            this.inventoryActive = false;
            this.conversation = false;
            this.end = false;
            this.clearHand = () => this.hand = null;
            this.setHand = (object) => this.hand = object;
            this.setCurrentItem = (item) => this.currentItem = item;
            this.setInventoryStatus = (value) => this.inventoryActive = value;
            this.setConversation = (value) => this.conversation = value;
            this.setRoom = (room) => this.currentRoom = room;
            this.setTutorial = (value) => this.tutorialMode = value;
            this.endGame = () => this.end = true;
            this.currentRoom = rooms[2];
        }
        move(direction) {
            const max = this.currentRoom.options.length - 1;
            direction == "right" ? this.selectionNumber++ : this.selectionNumber--;
            if (this.selectionNumber < 0)
                this.selectionNumber = max;
            if (this.selectionNumber > max)
                this.selectionNumber = 0;
            this.selection = getGameObject(this.currentRoom.options[this.selectionNumber]);
        }
        setSelection(index) {
            this.selection = getGameObject(this.currentRoom.options[index]);
        }
    }
    const G = new Game();

    function checkTurnExceptions() {
        var _a;
        //if the sound "a secruity door" has been played once, it is changed to "the secruity door"
        if (((_a = G.selection) === null || _a === void 0 ? void 0 : _a.name) !== "hallway2" || getGameObject("hallway2").sound.length <= 1)
            return;
        getGameObject("hallway2").sound.splice(0, 1);
    }
    //update selection
    function turn(d, noSound) {
        var _a;
        G.move(d);
        if (noSound)
            return;
        (_a = G.selection) === null || _a === void 0 ? void 0 : _a.sound[0].play();
        checkTurnExceptions();
    }
    const quickTimeEndConditions = () => { var _a, _b; return ((_a = G.hand) === null || _a === void 0 ? void 0 : _a.name) == "crowbar" && G.currentRoom.name == "lab" && ((_b = G.selection) === null || _b === void 0 ? void 0 : _b.name) == "hallway1"; };
    function endQuicktime(room) {
        getGameObject("hallway1").locked = false;
        getGameObject("hallway1").sound.splice(0, 1);
        sfx.openUp.play();
        G.setRoom(room);
        G.setSelection(0);
        setTimeout(() => sfx.quicktime.stop(), 8000);
        G.clearHand();
    }
    function changeRoom() {
        const room = rooms.find(r => { var _a; return r.name == ((_a = G.selection) === null || _a === void 0 ? void 0 : _a.name); });
        if (!room)
            return console.error("Room not found");
        if (quickTimeEndConditions())
            return endQuicktime(room);
        if (room.locked)
            return sfx.locked.play();
        G.setRoom(room);
        G.setSelection(0);
        sfx.door.play();
        console.log("Raum gewechselt");
    }
    function talkAI(command) {
        if (command == "start") {
            sfx.AIRestored.play();
            G.clearHand();
            G.currentRoom.options.splice(G.selectionNumber, 1);
            getGameObject("hallway2").locked = false;
            G.setConversation(true);
        }
        if (command == "yes" || command == "ArrowUp") {
            sfx.yes.play();
            G.setConversation(false);
        }
        if (command == "no" || command == "ArrowDown") {
            sfx.no.play();
            G.setConversation(false);
        }
    }
    const isPocketableItem = (selection) => selection.name !== "Leer" && selection.type === "item" && G.selectionNumber !== G.currentRoom.options.length - 1;
    function getItem() {
        if (I.isActive())
            return console.warn("Cannot get item. Inventory is active.");
        const selection = G.selection;
        if (!selection)
            return console.warn("No item selected.");
        if (!isPocketableItem(selection))
            return sfx.cannotTake.play();
        I.push(selection);
        G.currentRoom.options.splice(G.selectionNumber, 1);
        sfx.zipper.play();
        turn("right", true);
        setTimeout(() => sfx.took.play(), sfx.zipper.duration() - 350);
    }

    const bg = document.getElementById("background"), titleElement = document.getElementById("title"), startText = document.getElementById("start"), downloadText = document.getElementById("download-link");

    const FIRST_AMBIENT_SOUND_DELAY = 125000, PLAYBACK_INPUT_THRESHOLD = 500;

    //This variable controls the intervals in which the ambient sound is played.
    let ambientSound; //function playing ambient sound in regular intervals;
    function gameOver(status) {
        clearInterval(ambientSound);
        ambience.fade();
        if (status == "loss") {
            G.endGame();
            sfx.gameOver.play();
        }
        if (status == "win") {
            G.endGame();
            sfx.captain.play();
            setTimeout(() => sfx.gameOver.play(), sfx.captain.duration() + 1000);
        }
    }
    function startUI() {
        //play and repeat ambient sounds. This interval function is terminated in gameOver();
        setTimeout(() => {
            ambience.play(true);
            ambientSound = setInterval(() => ambience.play(true), ambience.duration());
        }, FIRST_AMBIENT_SOUND_DELAY);
        //show UI
        bg.style.opacity = "1";
        titleElement.style.color = "white";
        startText.style.animation = "none";
        setTimeout(() => { startText.style.opacity = "0"; }, 100);
        setTimeout(() => {
            bg.style.opacity = "0";
            titleElement.style.color = "black";
            downloadText.style.opacity = "0";
        }, 10000);
    }

    function space() {
        if (!I.isActive())
            return getItem();
        sfx.activated.play();
        G.setHand(I.getSelected());
        console.log("Hand", G.hand);
    }
    function left() {
        if (G.conversation)
            return;
        I.isActive() ? I.move("left") : turn("left");
    }
    function right() {
        if (G.conversation)
            return;
        I.isActive() ? I.move("right") : turn("right");
    }
    function enter() {
        const sel = G.selection;
        if (!sel)
            return changeRoom();
        if (sel.name === "lockedRoom" || sel.name === "lockedDoor")
            return sfx.locked.play();
        if (quickTimeEndConditions())
            return changeRoom();
        if (sel.name == "lab")
            return getGameObject("lab").sound[1].play();
        if (sel.name == "slit" && G.hand && G.hand.name == "disk")
            return talkAI("start");
        if (sel.type == "item" || sel.type == "object")
            return sel.sound[1].play();
        if (sel.name == "bridge")
            return gameOver("win");
        changeRoom();
    }
    const actions = {
        ArrowUp: () => I.close(),
        ArrowDown: () => I.open(),
        ArrowLeft: left,
        ArrowRight: right,
        Enter: enter,
        Space: space,
        Escape: () => null,
    };

    let tutorialProgress = 0;
    const skipTutorial = () => upActions[6]();
    function tutorial(keycode) {
        if (remainingPlayBack > 300)
            return;
        if (keycode == "Escape")
            return skipTutorial();
        const keyActions = tutorialActions[keycode];
        if (!(tutorialProgress in keyActions))
            return AI.wrongKey.play();
        keyActions[tutorialProgress]();
    }
    const upActions = {
        0: () => {
            AI.startProgram.play();
            setTimeout(() => AI.arrowKeyLook.play(), 1750);
            tutorialProgress++;
        },
        1: () => AI.arrowKeyLook.play(),
        3: () => null,
        4: () => {
            var _a;
            if (((_a = G.hand) === null || _a === void 0 ? void 0 : _a.name) == "flask") {
                I.close();
                setTimeout(() => AI.well.play(), 750);
                setTimeout(() => AI.enterObject.play(), 2000);
                tutorialProgress++;
            }
        },
        6: () => {
            sfx.quicktime.play(true);
            G.setTutorial(false);
            setTimeout(() => {
                if (G.currentRoom.name == "lab")
                    gameOver("loss");
            }, sfx.quicktime.duration());
        }
    };
    const downActions = {
        3: () => { I.open(); setTimeout(() => AI.spacebarFlask.play(), 1750); },
        6: () => AI.fear.play()
    };
    function turnAndCheckIfFinished(direction) {
        var _a;
        actions["Arrow" + direction]();
        if (((_a = G.selection) === null || _a === void 0 ? void 0 : _a.name) !== "pipette")
            return;
        setTimeout(() => AI.well.play(), 1250);
        setTimeout(() => {
            AI.spaceBarObject.play();
            tutorialProgress++;
        }, 2500);
    }
    const leftActions = {
        1: () => turnAndCheckIfFinished("Left"),
        2: actions["ArrowLeft"],
        5: actions["ArrowLeft"]
    };
    const rightActions = {
        1: () => turnAndCheckIfFinished("Right"),
        2: actions["ArrowRight"],
        5: actions["ArrowRight"]
    };
    const spaceActions = {
        2: () => {
            var _a;
            if (((_a = G.selection) === null || _a === void 0 ? void 0 : _a.name) !== "flask")
                return sfx.cannotTake.play();
            actions["Space"]();
            setTimeout(() => {
                AI.flaskInBag.play();
                tutorialProgress++;
            }, 2000);
        },
        3: () => { actions["Space"](); tutorialProgress++; },
        4: actions["Space"]
    };
    const enterActions = {
        5: () => {
            var _a, _b;
            if (((_a = G.selection) === null || _a === void 0 ? void 0 : _a.name) !== "testTube" || ((_b = G.hand) === null || _b === void 0 ? void 0 : _b.name) !== "flask")
                return;
            G.clearHand();
            I.removeCurrent();
            sfx.pour.play();
            setTimeout(() => {
                AI.tutorialFinish.play();
                tutorialProgress++;
            }, sfx.pour.duration() - 3000);
        }
    };
    const tutorialActions = {
        ArrowUp: upActions,
        ArrowDown: downActions,
        ArrowLeft: leftActions,
        ArrowRight: rightActions,
        Enter: enterActions,
        Space: spaceActions,
        Escape: {}
    };

    const keyConversions = new Map([
        ['w', 'ArrowUp'],
        ['s', 'ArrowDown'],
        ['a', 'ArrowLeft'],
        ['d', 'ArrowRight'],
        [' ', 'Space'],
        ['NumpadEnter', 'Enter'],
    ]);
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Escape'];
    const isValidKey = (key) => !!keys.find(k => k == key);
    const convertKey = (key) => { var _a; return (_a = keyConversions.get(key)) !== null && _a !== void 0 ? _a : key; };
    function validateKey(e) {
        const key = convertKey(e.key);
        return isValidKey(key) ? key : null;
    }

    let start = false;
    let introFinished = false;
    //check user input
    function handleKey(e) {
        if (G.end)
            return console.log("Game Over");
        if (!introFinished)
            return intro(e.key);
        const key = validateKey(e);
        if (!key)
            return console.warn("Invalid Key", key);
        if (G.tutorialMode)
            return tutorial(key);
        if (remainingPlayBack >= PLAYBACK_INPUT_THRESHOLD)
            return;
        if (G.conversation)
            return talkAI(key);
        actions[key]();
    }
    document.addEventListener('keyup', handleKey);
    function intro(keycode) {
        if (!start)
            return startUp();
        if (keycode == "Escape")
            stopScore();
    }
    function startUp() {
        start = true;
        score.play();
        setTimeout(() => introFinished = true, score.duration());
        startUI();
        G.setTutorial(true);
    }
    function stopScore() {
        score.stop();
        audioLength(0);
        introFinished = true;
        tutorial("ArrowUp");
    }

}());

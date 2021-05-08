import { gameObject, getGameObject, room, rooms } from "./game-objects";
import { bg, startText, titleElement } from "./dom-utils";
import { score, ambience, AI, sfx } from "./sound-files";
import { remainingPlayBack } from "./sound";

//decleration of variables
let end = false;
let start = false;
let tutorialProgress = 0;
let tutorialMode = false;
let conversation = false;

//navigational variables
let currentRoom: room;
let selection: gameObject;
let selectionNumber: number;

//inventory
let hand: gameObject | null;
let currentItem: gameObject;
const inventory: gameObject[] = [];
let inventoryPos = 0;
let inventoryActive = false;



//This variable controls the intervals in which the ambient sound is played.
let ambientSound: number //function playing ambient sound in regular intervals;


//update selection
function turn(direction: string) {
  //check direction
  switch(direction) {
  case "right":
    if (selectionNumber === currentRoom.options.length - 1) {
      selectionNumber = 0;
      break;
    }
    selectionNumber++;
     break;
    
  case "left":

    if (selectionNumber === 0) {
      selectionNumber = currentRoom.options.length - 1;
      break;
    } 
      selectionNumber--;
      break;

      case "afterItemPickUp":
    if (selectionNumber === currentRoom.options.length - 1) {
      selectionNumber = 0;
      break;
    } 
    selectionNumber++;
    break
  }

  selection = getGameObject(currentRoom.options[selectionNumber]);

  if (direction !== "afterItemPickUp") {
    console.log(selection);
    if (selection.type !== "room") {
      selection.sound[0].play();
    } else {
      for (const room of rooms) {
        if (room == selection) {
          room.sound[0].play();
        }
      }
    }
  }
  if (selection.name == "hallway2" && getGameObject("hallway2").sound.length > 1) {

    getGameObject("hallway2").sound.splice(0, 1)

  }
}
//startUp
function startUp() {
  //play score 
 // score.play();
 
  //play and repeat ambient sounds. This interval function is terminated in gameOver();
  setTimeout(function () {

    ambience.play("background");
    ambientSound = setInterval(() => {

      ambience.play();
    }, 165000);
  }, 125000);

  //show UI
  bg.style.opacity = "1";
  titleElement.style.color = "white";
  startText.style.opacity = "0";
  setTimeout(() => {
    bg.style.opacity = "0";
    titleElement.style.color = "black";
    startText.style.opacity = "0";
  }, 10000);

  //set Position
  currentRoom = rooms[2];
  selectionNumber = 0;
}

//start tutorial
tutorialMode = true;


//check user input
document.addEventListener('keyup', (e) => {
  if (!start) {
    start = true;
    startUp();
  } else if (end) {
    console.log("Game Over");
  } else if (remainingPlayBack < 500 && !tutorialMode && !conversation) {

    switch (e.code) {
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "Enter":
        enter();
        break;
      case "Space":
        space();
        break;
      default:
        break;
    }
  } else if (tutorialMode && remainingPlayBack < 300) {
    tutorial(e);
  } else if (conversation && remainingPlayBack < 500) {
    switch (e.code) {
      case "ArrowUp":
        talkAI("yes");
        break;
      case "ArrowDown":
        talkAI("no");
        break;
    }
  }
}
)

function up() {
  console.log("Hoch");
  if (inventoryActive === true) {
    inventoryActive = false;
    sfx.close.play();
  }
  else {
    console.log(currentRoom.options.length);
  }
}

function down() {
  console.log("RUUUUNTA!");
  if (!inventoryActive) {
    openInventory();
  }
}

function left() {
  if (!conversation) {
    if (inventoryActive === true) {
      switchInventory("left");
    } else {
      turn("left");
    }
  }
}

function right() {
  if (!conversation) {
    if (inventoryActive === true) {
      switchInventory("right")
    }
    else {
      turn("right");
    }
  }
}

function enter() {
  if (selection.name === "lockedRoom" || selection.name === "lockedDoor") {
    console.log("verschlossen");
    sfx.locked.play();
  } else if (currentRoom == getGameObject("lab") && selection.name == "hallway1" && hand && hand.name == "crowbar") {
    changeRoom();
  } else if (selection.name == "lab") {
    getGameObject("lab").sound[1].play();
  } else if (selection.name == "slit" && hand && hand.name == "disk") {
    talkAI("start");
  } else if (selection.type == "item" || selection.type == "object") {
    selection.sound[1].play();
  } else if (selection.name == "bridge") {
    gameOver("win");
  } else {
    changeRoom();
  }
}

function space() {

  console.log("Space");
  if (inventoryActive) {
    sfx.activated.play();
    hand = inventory[inventoryPos];
    console.log(hand);
  } else {
    getItem();
  }
}


function openInventory() {
  inventoryPos = 0;
  sfx.open.play();
  inventoryActive = true;
  inventory.forEach(element => {
    console.log(element);
  });
  setTimeout(function () {
    if (inventory.length > 0 && inventory[inventoryPos].type == "item") {
      inventory[inventoryPos].sound[0].play();
    };
    if (inventory.length === 0) {
      sfx.empty.play();
    }
  }, 750);
}



function getItem() {
  if (!inventoryActive) {
    if (selectionNumber === currentRoom.options.length - 1 || selection.name === "Leer" || getGameObject(selection.name).type !== "item") {
      console.log("Das kann ich nicht mitnehmen");
      sfx.cannotTake.play();

    } else {
      inventory[inventory.length] = getGameObject(selection.name);
      currentRoom.options.splice(selectionNumber, 1);
      sfx.zipper.play();
      if (!tutorialMode) {
        setTimeout(function () {
          sfx.took.play();
        }, 1250);
      }
    }
    turn("afterItemPickUp");
  }
}

function switchInventory(direction:string) {

  if (inventory.length === 0) {
    sfx.empty.play();
    console.log("Meine Tasche ist leer.");
  } else if (direction == "right") {
    if (inventoryPos === 0) {
      inventoryPos = inventory.length - 1;
    } else {
      inventoryPos--;
    }
  } else if (direction == "left") {

    if (inventoryPos === inventory.length - 1) {
      inventoryPos = 0;
    } else {
      inventoryPos++;
    }
    console.log(inventory[inventoryPos].name);
  }
  if (inventory.length != 0 && inventory[inventoryPos].type == "item") {
    inventory[inventoryPos].sound[0].play();
  }
}

function tutorial(e:KeyboardEvent) {
  if (remainingPlayBack < 300) {
    switch (e.code) {
      case "ArrowUp":
        tutorialUp();
        break;
      case "ArrowDown":
        tutorialDown();
        break;
      case "ArrowLeft":
        tutorialLeft();
        break;
      case "ArrowRight":
        tutorialRight();
        break;
      case "Enter":
        tutorialEnter();
        break;
      case "Space":
        tutorialSpace();
        break;
      default:
        break;
    }
  }
}

function tutorialUp() {
  switch (tutorialProgress) {
    case 0:
      AI.startProgram.play();
      setTimeout(function () {
        AI.arrowKeyLook.play();
      }, 1750);
      tutorialProgress++;
      break;
    case 1:
      AI.arrowKeyLook.play();
      break;
    case 2:
      AI.wrongKey.play();
      break;
    case 3:
      AI.wrongKey.play();
      break;
    case 4:
      if (hand && hand.name == "flask") {
        up();
        setTimeout(function () {
          AI.well.play();
        }, 750);
        setTimeout(function () {
          AI.enterObject.play();
        }, 2000);
        tutorialProgress++;
      }
      break;
    case 5:
      AI.wrongKey.play();
      break;
    case 6:
      sfx.quicktime.play("background");
      tutorialMode = false;
      setTimeout(function () {
        if (currentRoom.name == "lab") {
          gameOver("lose");
        }
      }, 112000);
      break;
    default:
      break;
  }
}
function tutorialDown() {
  switch (tutorialProgress) {
    case 0:
      AI.wrongKey.play();
      break;
    case 1:
      AI.wrongKey.play();
      break;
    case 2:
      AI.wrongKey.play();
      break;
    case 3:
      down();
      setTimeout(function () {
        AI.spacebarFlask.play();
      }, 1750);
      break;
    case 4:
      AI.wrongKey.play();
      break;
    case 5:
      AI.wrongKey.play();
      break;
    case 6:
      AI.fear.play();
      break;
    default:
      break;
  }
}
function tutorialLeft() {
  switch (tutorialProgress) {
    case 0:
      AI.wrongKey.play();
      break;
    case 1:
      left();
      if (selection.name == "pipette") {
        setTimeout(function () {
          AI.well.play();
        }, 1250);

        setTimeout(function () {
          AI.spaceBarObject.play();
          tutorialProgress++;
        }, 2500);

      }
      break;
    case 2:
      left();
      break;
    case 3:
      AI.wrongKey.play();
      break;
    case 4:
      AI.wrongKey.play();
      break;
    case 5:
      left();
      break;
    default:
      break;
  }
}
function tutorialRight() {
  switch (tutorialProgress) {
    case 0:
      AI.wrongKey.play();
      break;
    case 1:
      right();
      if (selection.name == "pipette") {
        setTimeout(function () {
          AI.well.play();
        }, 1250);

        setTimeout(function () {
          AI.spaceBarObject.play();
          tutorialProgress++;
        }, 2500);

      }
      break;
    case 2:
      right();
      break;
    case 3:
      AI.wrongKey.play();
      break;
    case 4:
      AI.wrongKey.play();
      break;
    case 5:
      right();
      break;
    default:
      break;
  }
}
function tutorialSpace() {
  switch (tutorialProgress) {
    case 0:
      AI.wrongKey.play();
      break;
    case 1:
      AI.wrongKey.play();
      break;
    case 2:
      if (selection.name == "flask") {
        space();
        setTimeout(function () {
          AI.flaskInBag.play();
          tutorialProgress++;
        }, 2000);

      } else {
        sfx.cannotTake.play();
      }
      break;
    case 3:
      space();
      tutorialProgress++;
      break;
    case 4:
      space();
      break;
    case 5:
      AI.wrongKey.play();
      break;
    default:
      break;
  }
}
function tutorialEnter() {
  switch (tutorialProgress) {
    case 0:
      AI.wrongKey.play();
      break;
    case 1:
      AI.wrongKey.play();
      break;
    case 2:
      AI.wrongKey.play();
      break;
    case 3:
      AI.wrongKey.play();
      break;
    case 4:
      AI.wrongKey.play();
      break;
    case 5:
      if (selection.name == "testTube" && hand && hand.name == "flask") {
        hand = null;
        inventory.splice(inventoryPos, 1);
        sfx.pour.play();
        setTimeout(function () {
          AI.tutorialFinish.play();
          tutorialProgress++;
        }, 5000);
      }
      break;
    default:
      break;
  }
}
function talkAI(command:string) {
  if (command == "start") {
    sfx.AIRestored.play();
    hand = null;
    currentRoom.options.splice(selectionNumber, 1);
    getGameObject("hallway2").locked = false;
    conversation = true;
  }
  if (command == "yes") {
    sfx.yes.play();
    conversation = false;
  }
  if (command == "no") {
    sfx.no.play();
    conversation = false;
  }
}
function gameOver(status:string) {
  clearInterval(ambientSound);
  ambience.stop();
  if (status == "lose") {
    end = true;
    sfx.gameOver.play();
  }
  if (status == "win") {
    end = true;
    sfx.captain.play();
    setTimeout(function () {
      sfx.gameOver.play();
    }, 20000);
  }
}
function changeRoom() {

  for (const room of rooms) {

    if (selection.name === room.name) {
      if (hand && hand.name == "crowbar" && currentRoom.name == "lab") {
        endQuicktime(room);
        return;
      }
      if (!room.locked) {
        currentRoom = room;
        selectionNumber = 0;
        sfx.door.play();
        console.log("Raum gewechselt");
      } else {
        console.log("verschlossen");
        sfx.locked.play();
      }
    }
  }
}

function endQuicktime(room:room) {
  getGameObject("hallway1").locked = false;
  getGameObject("hallway1").sound.splice(0, 1);
  sfx.openUp.play();
  currentRoom = room;
  selectionNumber = 0;
  setTimeout(() => {
    sfx.quicktime.stop();
  }, 8000);
  hand = null;
}

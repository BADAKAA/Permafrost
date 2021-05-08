import { turn } from "./game-logic";
import { getGameObject } from "./game-objects";
import { sfx } from "./sound-files";
import { conversation, currentRoom, hand, inventory, inventoryActive, selection, selectionNumber, setHand, setInventory } from "./status";
import { tutorialMode } from "./status";

export let inventoryPos:number = 0;

export function switchInventory(direction:string) {

  if (inventory.length === 0) {
    sfx.empty.play();
    console.log("Meine Tasche ist leer.");
    return;
  } 
  switch(direction) {
  case "right": 
    if (inventoryPos === 0) {
      inventoryPos = inventory.length - 1;
      break;
    }
      inventoryPos--;
      break;

    case "left": 
    if (inventoryPos === inventory.length - 1) {
      inventoryPos = 0;
      break;
    }
      inventoryPos++;
      break
  }

  console.log(inventory[inventoryPos].name);

  if (inventory.length !== 0 && inventory[inventoryPos].type == "item") {
    inventory[inventoryPos].sound[0].play();
  }
}

export function openInventory() {

  if(inventoryActive) return;
  inventoryPos = 0;
  sfx.open.play();
  setInventory(true)
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

export function closeInventory() {
  console.log("Hoch");
  if (inventoryActive) {
    setInventory(false);
    sfx.close.play();
  }
  else {
    console.log(currentRoom.options.length);
  }
}


export function left() {
  if (!conversation) {
    if (inventoryActive === true) {
      switchInventory("left");
    } else {
      turn("left");
    }
  }
}

export function right() {
  if (!conversation) {
    if (inventoryActive === true) {
      switchInventory("right")
    }
    else {
      turn("right");
    }
  }
}


export function getItem() {
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
export function space() {

  if (inventoryActive) {
    sfx.activated.play();
    setHand(inventory[inventoryPos]);
    console.log(hand);
  } else {
    getItem();
  }
}
import { GameObject, getGameObject, room, rooms } from "./utils/game-objects";
import { I } from "./inventory";
import { sfx } from "./utils/sound-files";
import { G } from "./status";
import { Direction } from "./types/Direction";

function checkTurnExceptions() {
  //if the sound "a secruity door" has been played once, it is changed to "the secruity door"
  if (G.selection?.name !== "hallway2" || getGameObject("hallway2").sound.length <= 1) return;
  getGameObject("hallway2").sound.splice(0, 1)
}
//update selection
export function turn(d:Direction,noSound?:boolean) {
  G.move(d);
  if (noSound) return;
  G.selection?.sound[0].play();
  checkTurnExceptions();
}

export const quickTimeEndConditions = () => 
  G.hand?.name == "crowbar" && G.currentRoom.name == "lab" && G.selection?.name == "hallway1";

export function endQuicktime(room:room) {
  getGameObject("hallway1").locked = false;
  getGameObject("hallway1").sound.splice(0, 1);
  sfx.openUp.play();
  G.setRoom(room);
  G.setSelection(0);
  setTimeout(() => sfx.quicktime.stop(), 8000);
  G.clearHand();
}

export function changeRoom() {
  const room = rooms.find(r=>r.name==G.selection?.name);
  if (!room) return console.error("Room not found");
  if (quickTimeEndConditions()) return endQuicktime(room);
  if (room.locked) return sfx.locked.play();

  G.setRoom(room);
  G.setSelection(0);
  sfx.door.play();
  console.log("Raum gewechselt");
}

export function talkAI(command: string) {
  if (command == "start") {
    sfx.AIRestored.play();
    G.clearHand()
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

const isPocketableItem = (selection:GameObject) => selection.name !== "Leer" && selection.type === "item" && G.selectionNumber !== G.currentRoom.options.length - 1;

export function getItem() {
  if (I.isActive()) return console.warn("Cannot get item. Inventory is active.");

  const selection = G.selection;
  if (!selection) return console.warn("No item selected.");
  if (!isPocketableItem(selection)) return sfx.cannotTake.play();
  
  I.push(selection)
  G.currentRoom.options.splice(G.selectionNumber, 1);
  sfx.zipper.play();
  turn("right",true);
  setTimeout(() => sfx.took.play(), sfx.zipper.duration() + 250);
}
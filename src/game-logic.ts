import { getGameObject, room, rooms } from "./game-objects";
import { sfx } from "./sound-files";
import { G } from "./status";
import { Direction } from "./types/Direction";
import { gameOver } from "./UI";

//update selection
export function turn(d:Direction,noSound?:boolean) {
  G.move(d);
  if (noSound) return;
  G.selection?.sound[0].play()
  
  //if the sound "a secruity door" has been played once, it is changed to "the secruity door"
  if (G.selection?.name !== "hallway2" || getGameObject("hallway2").sound.length <= 1) return;
  getGameObject("hallway2").sound.splice(0, 1)
}

const quickTimeEndConditions = () => G.hand && G.hand.name == "crowbar" && G.currentRoom.name == "lab";

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
  
    
export function endQuicktime(room:room) {
  getGameObject("hallway1").locked = false;
  getGameObject("hallway1").sound.splice(0, 1);
  sfx.openUp.play();
  G.setRoom(room);
  G.setSelection(0);
  setTimeout(() => sfx.quicktime.stop(), 8000);
  G.clearHand();
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
  if (command == "no" || command=="ArrowDown") {
    sfx.no.play();
    G.setConversation(false);
  }
}

export function enter() {
  const sel = G.selection;
  if (!sel) return changeRoom();

  if (sel.name === "lockedRoom" || sel.name === "lockedDoor") return sfx.locked.play();

  if (G.currentRoom.name == "lab" && sel.name == "hallway1" && G.hand && G.hand.name == "crowbar") {
    return changeRoom();
  } 
  if (sel.name == "lab") return getGameObject("lab").sound[1].play();
  if (sel.name == "slit" && G.hand && G.hand.name == "disk") return talkAI("start");
  if (sel.type == "item" || sel.type == "object") return sel.sound[1].play();
  if (sel.name == "bridge") return gameOver("win");
  changeRoom();
}
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
  if (G.selection?.name == "hallway2" && getGameObject("hallway2").sound.length > 1) {
    getGameObject("hallway2").sound.splice(0, 1)
  }
  }

 export function changeRoom() {

    for (const room of rooms) {
      
      if (G.selection?.name === room.name) {
        if (G.hand && G.hand.name == "crowbar" && G.currentRoom.name == "lab") {
          endQuicktime(room);
          return;
        }
        if(room.locked) {
          console.log("verschlossen");
          sfx.locked.play();
          return
        } 
        G.setRoom(room);
        G.setSelection(0);
        sfx.door.play();
        console.log("Raum gewechselt");
        return
      }
    }
  }
  
    
export function endQuicktime(room:room) {

    getGameObject("hallway1").locked = false;
    getGameObject("hallway1").sound.splice(0, 1);
    sfx.openUp.play();
    G.setRoom(room);
    G.setSelection(0);
    setTimeout(() => {
      sfx.quicktime.stop();
    }, 8000);
    G.clearHand();
  }

 export function talkAI(command: string) {
    //"command" can be both a key code and a word. Here, the input is converted in case it is a key code.
    if (command=="ArrowUp") command="yes";
    if (command=="ArrowDown") command="no";
  
    if (command == "start") {
      sfx.AIRestored.play();
      G.clearHand()
      G.currentRoom.options.splice(G.selectionNumber, 1);
      getGameObject("hallway2").locked = false;
      G.setConversation(true);
    }
    if (command == "yes") {
      sfx.yes.play();
      G.setConversation(false);
    }
    if (command == "no") {
      sfx.no.play();
      G.setConversation(false);
    }
  }

  export function enter() {

    if (G.selection?.name === "lockedRoom" || G.selection?.name === "lockedDoor") {
      console.log("verschlossen");
      sfx.locked.play();
      return
    }
    if (G.currentRoom == getGameObject("lab") && G.selection?.name == "hallway1" && G.hand && G.hand.name == "crowbar") {
      changeRoom();
      return
    } 
    if (G.selection?.name == "lab") {
      getGameObject("lab").sound[1].play();
      return
    }
    if (G.selection?.name == "slit" && G.hand && G.hand.name == "disk") {
      talkAI("start");
      return
    }
    if (G.selection?.type == "item" || G.selection?.type == "object") {
      G.selection?.sound[1].play();
      return
    }
    if (G.selection?.name == "bridge") {
      gameOver("win");
      return
    } 
    changeRoom();
  }
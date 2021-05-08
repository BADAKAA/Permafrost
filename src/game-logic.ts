import { getGameObject, room, rooms } from "./game-objects";
import { sfx } from "./sound-files";
import { selectionNumber, currentRoom, selection, hand, setConversation, setSelection, addToSelection, setRoom, clearHand } from "./status";
import { gameOver } from "./UI";


//update selection
export function turn(direction: string) {
    //check direction
    switch(direction) {
    case "right":
      if (selectionNumber === currentRoom.options.length - 1) {
        setSelection(0);
        break;
      }
      addToSelection(1)
       break;
      
    case "left":
      if (selectionNumber === 0) {
        setSelection(currentRoom.options.length - 1);
        break;
      } 
        addToSelection(-1)
        break;
  
        case "afterItemPickUp":
      if (selectionNumber === currentRoom.options.length - 1) {
        setSelection(0)
        break;
      } 
      addToSelection(1)
      break
    }
  
    if (direction == "afterItemPickUp") return console.log(selection);

    if (selection.type !== "room") return selection.sound[0].play()

    for (const room of rooms) {
      if (room == selection) {
        room.sound[0].play();
      }
    }
    //if the sound "a secruity door" has been played once, it is changed to "the secruity door"
    if (selection.name == "hallway2" && getGameObject("hallway2").sound.length > 1) {
      getGameObject("hallway2").sound.splice(0, 1)
    }
  }

 export function changeRoom() {

    for (const room of rooms) {
      
      if (selection.name === room.name) {
        if (hand && hand.name == "crowbar" && currentRoom.name == "lab") {
          endQuicktime(room);
          return;
        }
        if(room.locked) {
          console.log("verschlossen");
          sfx.locked.play();
          return
        } 
        setRoom(room);
        setSelection(0);
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
    setRoom(room);
    setSelection(0);
    setTimeout(() => {
      sfx.quicktime.stop();
    }, 8000);
    clearHand();
  }

 export function talkAI(command: string) {
    //"command" can be both a key code and a word. Here, the input is converted in case it is a key code.
    if (command=="ArrowUp") command="yes";
    if (command=="ArrowDown") command="no";
  
    if (command == "start") {
      sfx.AIRestored.play();
      clearHand()
      currentRoom.options.splice(selectionNumber, 1);
      getGameObject("hallway2").locked = false;
      setConversation(true);
    }
    if (command == "yes") {
      sfx.yes.play();
      setConversation(false);
    }
    if (command == "no") {
      sfx.no.play();
      setConversation(false);
    }
  }

  export function enter() {

    if (selection.name === "lockedRoom" || selection.name === "lockedDoor") {
      console.log("verschlossen");
      sfx.locked.play();
      return
    }
    if (currentRoom == getGameObject("lab") && selection.name == "hallway1" && hand && hand.name == "crowbar") {
      changeRoom();
      return
    } 
    if (selection.name == "lab") {
      getGameObject("lab").sound[1].play();
      return
    }
    if (selection.name == "slit" && hand && hand.name == "disk") {
      talkAI("start");
      return
    }
    if (selection.type == "item" || selection.type == "object") {
      selection.sound[1].play();
      return
    }
    if (selection.name == "bridge") {
      gameOver("win");
      return
    } 
    changeRoom();
  }
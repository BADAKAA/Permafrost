import { GameObject, getGameObject, room, rooms } from "./utils/game-objects";
import { Direction } from "./types/Direction";


class Game {
    tutorialMode:boolean = false;
    hand: GameObject | null = null;
    
    //navigational variables
    currentRoom: room
    selectionNumber: number = 0;
    selection?: GameObject;
    //inventory
    inventoryActive:boolean = false;
    currentItem?: GameObject;
    conversation:boolean = false;
    end:boolean = false;

    constructor() {
        this.currentRoom = rooms[2];
    }

    clearHand = () => this.hand=null;
    setHand = (object:GameObject) => this.hand=object;
    setCurrentItem= (item:GameObject) => this.currentItem=item;
    setInventoryStatus = (value:boolean) => this.inventoryActive = value;
    setConversation = (value:boolean) => this.conversation=value;
    setRoom = (room:room) => this.currentRoom=room;
    setTutorial = (value:boolean) => this.tutorialMode=value;
    endGame = () => this.end=true;
    
    move(direction:Direction) {
        const max = this.currentRoom.options.length - 1;
        direction=="right" ? this.selectionNumber++ : this.selectionNumber--;
        if (this.selectionNumber < 0) this.selectionNumber = max;
        if (this.selectionNumber > max) this.selectionNumber = 0;
        this.selection = getGameObject(this.currentRoom.options[this.selectionNumber]);
    }
    setSelection(index:number) {
        this.selection = getGameObject(this.currentRoom.options[index]);
    }
}

export const G:Game = new Game();

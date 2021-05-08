import { gameObject, getGameObject, room, rooms } from "./game-objects";

export let tutorialMode:boolean = false;
export let hand: gameObject | null;

//navigational variables
export let currentRoom: room;
export let selectionNumber: number;
export let selection: gameObject;
//inventory
export let currentItem: gameObject;
export const inventory: gameObject[] = [];
export let inventoryActive:boolean = false;
export let conversation:boolean = false;
export let end:boolean=false;

export function initialisePoisition() {
    //set Position
    currentRoom = rooms[2];
    selectionNumber = 0;
}
export function clearHand() {
    hand=null;
}
export function setHand(object:gameObject) {
    hand=object;
}
export function setCurrentItem(item:gameObject) {
    currentItem=item;
}
export function setInventory(value:boolean) {
    inventoryActive =value;;
}
export  function setConversation(value:boolean) {
    conversation=value;
}
export function endGame() {
    end=true;
}
export function setSelection(value:number) {
    selectionNumber=value;
    selection = getGameObject(currentRoom.options[selectionNumber]);
}
export function addToSelection(value:number) {
    selectionNumber+=value;
    selection = getGameObject(currentRoom.options[selectionNumber]);
}
export function setRoom(room:room) {
    currentRoom=room;
}
export function setTutorial(value:boolean) {
    tutorialMode=value
}
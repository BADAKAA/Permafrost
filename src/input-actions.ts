import { changeRoom, getItem, quickTimeEndConditions, talkAI, turn } from "./game-logic";
import { getGameObject } from "./game-objects";
import { I } from "./inventory";
import { sfx } from "./sound-files";
import { G } from "./status";
import { gameOver } from "./UI";


function space() {
    if (!I.isActive()) return getItem()
    sfx.activated.play();
    G.setHand(I.getSelected());
    console.log("Hand",G.hand);
}
function left() {
    if (G.conversation) return;
    I.isActive() ? I.move("left") : turn("left");
}
  
function right() {
    if (G.conversation) return;
    I.isActive() ? I.move("right") : turn("right");
}
  
export function enter() {
    const sel = G.selection;
    if (!sel) return changeRoom();
  
    if (sel.name === "lockedRoom" || sel.name === "lockedDoor") return sfx.locked.play();
    G.hand && G.hand.name == "crowbar" && G.currentRoom.name == "lab"
    if (quickTimeEndConditions()) return changeRoom();
    if (sel.name == "lab") return getGameObject("lab").sound[1].play();
    if (sel.name == "slit" && G.hand && G.hand.name == "disk") return talkAI("start");
    if (sel.type == "item" || sel.type == "object") return sel.sound[1].play();
    if (sel.name == "bridge") return gameOver("win");
    changeRoom();
  }


export const actions:{[key:string]:Function} = {
    ArrowUp:    ()=>I.close(),
    ArrowDown:  ()=>I.open(),
    ArrowLeft:  left,
    ArrowRight: right,
    Enter:      enter,
    Space:      space,
}
import { enter, turn } from "./game-logic";
import { I } from "./inventory";
import { sfx } from "./sound-files";
import { G } from "./status";


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
  
  
function getItem() {
    if (I.isActive()) return;

    const selection = G.selection;
    if (!selection) return console.warn("No item selected.");
    I.push(selection)
  
    if (G.selectionNumber === G.currentRoom.options.length - 1
        || selection.name === "Leer"
        || selection.type !== "item") {
      console.log("Das kann ich nicht mitnehmen");
      sfx.cannotTake.play();
      return
    } 
    G.currentRoom.options.splice(G.selectionNumber, 1);
    sfx.zipper.play();
    turn("right",true);
    setTimeout(() => sfx.took.play(), 1250);
  }


export const actions:{[key:string]:Function} = {
    ArrowUp:    ()=>I.close(),
    ArrowDown:  ()=>I.open(),
    ArrowLeft:  left,
    ArrowRight: right,
    Enter:      enter,
    NumpadEnter:enter,
    Space:      space,
}
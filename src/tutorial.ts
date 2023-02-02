import { remainingPlayBack } from "./sound";
import { actions } from "./input-actions";
import { AI, sfx } from "./sound-files";
import { gameOver } from "./UI";
import { I } from "./inventory";
import { G } from "./status";

interface Action {
  [key:number]:Function
}

let tutorialProgress:number = 0;

function skipTutorial() {
  tutorialProgress=6;
  upActions[tutorialProgress]();
}


export function tutorial(keycode:string) {
  if (remainingPlayBack > 300) return;
  if (keycode=="Escape") return skipTutorial();
  if (!tutorialActions.hasOwnProperty(keycode)) return;
  const keyActions = tutorialActions[keycode];
  if (!(tutorialProgress in keyActions)) return AI.wrongKey.play();
  keyActions[tutorialProgress]();
}

const upActions:Action = {
  0:() => {
    AI.startProgram.play();
    setTimeout(function () {
      AI.arrowKeyLook.play();
    }, 1750);
    tutorialProgress++;
  },
  1:()=>AI.arrowKeyLook.play(),
  3:()=>null,
  4:()=>{
    if (G.hand && G.hand.name == "flask") {
      I.close();
      setTimeout(function () {
        AI.well.play();
      }, 750);
      setTimeout(function () {
        AI.enterObject.play();
      }, 2000);
      tutorialProgress++;
    }
  },
  6:()=>{
    sfx.quicktime.play(true);
    G.setTutorial(false)
    setTimeout(function () {
      if (G.currentRoom.name == "lab") {
        gameOver("lose");
      }
    }, 112000);
  }
}

const downActions:Action = {
  3: () => { I.open(); setTimeout(() => AI.spacebarFlask.play(), 1750);},
  6: ()=>AI.fear.play()
}

function turnAndCheckIfFinished(direction:"Right"|"Left") {
  actions["Arrow"+direction]();
  if (G.selection?.name !== "pipette") return;
  setTimeout(()=>AI.well.play(), 1250);
  setTimeout(() => {
    AI.spaceBarObject.play();
    tutorialProgress++;
  }, 2500);
}
const leftActions:Action = {
  1: ()=>turnAndCheckIfFinished("Left"),
  2: actions["ArrowLeft"],
  5: actions["ArrowLeft"]
}

const rightActions:Action = {
  1: ()=>turnAndCheckIfFinished("Right"),
  2: actions["ArrowRight"],
  5: actions["ArrowRight"]
}

const spaceActions:Action = {
  2:() => {
    if (G.selection?.name !== "flask") return sfx.cannotTake.play();
    actions["Space"]();
    setTimeout(() => {
      AI.flaskInBag.play();
      tutorialProgress++;
    }, 2000);
  },
  3:() => {actions["Space"](); tutorialProgress++},
  4:actions["Space"]
}
const enterActions:Action = {
   5:() => {
    if (G.selection?.name !== "testTube" || !G.hand || G.hand.name !== "flask") return;
    G.clearHand();
    I.removeCurrent();
    sfx.pour.play();
    setTimeout(() => {
      AI.tutorialFinish.play();
      tutorialProgress++;
    }, 5000);
  }
}

const tutorialActions:{[key:string]:Action} = {
  ArrowUp:    upActions,
  ArrowDown:  downActions,
  ArrowLeft:  leftActions,
  ArrowRight: rightActions,
  Enter:      enterActions,
  NumpadEnter:enterActions,
  Space:      spaceActions,
}
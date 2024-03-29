import { remainingPlayBack } from "./sound";
import { actions } from "./input-actions";
import { AI, sfx } from "./utils/sound-files";
import { gameOver } from "./UI";
import { I } from "./inventory";
import { G } from "./status";
import { Key } from "./types/key";

interface Action {
  [key: number]: Function
}

let tutorialProgress: number = 0;

const  skipTutorial = () => upActions[6]();

export function tutorial(keycode: Key) {
  if (remainingPlayBack > 300) return;
  if (keycode == "Escape") return skipTutorial();
  const keyActions = tutorialActions[keycode];
  if (!(tutorialProgress in keyActions)) return AI.wrongKey.play();
  keyActions[tutorialProgress]();
}

const upActions: Action = {
  0: () => {
    AI.startProgram.play();
    setTimeout(() => AI.arrowKeyLook.play(), 1750);
    tutorialProgress++;
  },
  1: () => AI.arrowKeyLook.play(),
  3: () => null,
  4: () => {
    if (G.hand?.name == "flask") {
      I.close();
      setTimeout(() => AI.well.play(), 750);
      setTimeout(() => AI.enterObject.play(), 2000);
      tutorialProgress++;
    }
  },
  6: () => {
    sfx.quicktime.play(true);
    G.setTutorial(false)
    setTimeout(() => {
      if (G.currentRoom.name == "lab") gameOver("loss");
    }, sfx.quicktime.duration());
  }
}

const downActions: Action = {
  3: () => { I.open(); setTimeout(() => AI.spacebarFlask.play(), 1750); },
  6: () => AI.fear.play()
}

function turnAndCheckIfFinished(direction: "Right" | "Left") {
  actions["Arrow" + direction as Key]();
  if (G.selection?.name !== "pipette") return;
  setTimeout(() => AI.well.play(), 1250);
  setTimeout(() => {
    AI.spaceBarObject.play();
    tutorialProgress++;
  }, 2500);
}
const leftActions: Action = {
  1: () => turnAndCheckIfFinished("Left"),
  2: actions["ArrowLeft"],
  5: actions["ArrowLeft"]
}

const rightActions: Action = {
  1: () => turnAndCheckIfFinished("Right"),
  2: actions["ArrowRight"],
  5: actions["ArrowRight"]
}

const spaceActions: Action = {
  2: () => {
    if (G.selection?.name !== "flask") return sfx.cannotTake.play();
    actions["Space"]();
    setTimeout(() => {
      AI.flaskInBag.play();
      tutorialProgress++;
    }, 2000);
  },
  3: () => { actions["Space"](); tutorialProgress++ },
  4: actions["Space"]
}
const enterActions: Action = {
  5: () => {
    if (G.selection?.name !== "testTube" || G.hand?.name !== "flask") return;
    G.clearHand();
    I.removeCurrent();
    sfx.pour.play();
    setTimeout(() => {
      AI.tutorialFinish.play();
      tutorialProgress++;
    }, sfx.pour.duration() - 3000);
  }
}

const tutorialActions: { [K in Key]: Action } = {
  ArrowUp: upActions,
  ArrowDown: downActions,
  ArrowLeft: leftActions,
  ArrowRight: rightActions,
  Enter: enterActions,
  Space: spaceActions,
  Escape: {}
}
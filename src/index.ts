import { audioLength, remainingPlayBack } from "./sound";
import { tutorial } from "./tutorial";
import { startUI } from "./UI";
import { talkAI } from "./game-logic";
import { score } from "./sound-files";
import { G } from "./status";
import { actions } from "./input-actions";

let start         = false;
let introFinished = false;

//check user input
function handleKey(e:KeyboardEvent) {
  if (G.end) return console.log("Game Over");

  const key = validateKey(e);
  if (!key) return;
  if (!introFinished) return intro(key);
  if (G.tutorialMode) return tutorial(key);
  
  if (remainingPlayBack >= 500) return; 
  if (G.conversation) return talkAI(key);
  actions[key]();
}

document.addEventListener('keyup', handleKey)

function intro(keycode:Key) {
  if (!start) return startUp();
  if (keycode=="Escape") stopScore();
}
function startUp() {
  start = true;
  score.play();
  setTimeout(()=>introFinished=true, score.duration());
  startUI();
  G.setTutorial(true);
}

function stopScore() {
  score.stop();
  audioLength(0);
  introFinished = true;
  tutorial("ArrowUp");
}
import { audioLength, remainingPlayBack } from "./sound";
import { tutorial } from "./tutorial";
import { startUI } from "./UI";
import { talkAI } from "./game-logic";
import { score } from "./utils/sound-files";
import { G } from "./status";
import { actions } from "./input-actions";
import { validateKey } from "./types/key";
import { PLAYBACK_INPUT_THRESHOLD } from "./utils/settings";

let start         = false;
let introFinished = false;

//check user input
function handleKey(e:KeyboardEvent) {
  if (G.end) return console.log("Game Over");
  if (!introFinished) return intro(e.key);

  const key = validateKey(e);
  if (!key) return console.warn("Invalid Key",key);
  ;
  if (G.tutorialMode) return tutorial(key);
  
  if (remainingPlayBack >= PLAYBACK_INPUT_THRESHOLD) return; 
  if (G.conversation) return talkAI(key);
  actions[key]();
}

document.addEventListener('keyup', handleKey)

function intro(keycode:string) {
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
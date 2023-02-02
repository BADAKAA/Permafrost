import { audioLength, remainingPlayBack } from "./sound";
import { tutorial } from "./tutorial";
import { startUI } from "./UI";
import { talkAI, enter,} from "./game-logic";
import { score } from "./sound-files";
import { G } from "./status";
import { actions } from "./input-actions";

let start         = false;
let introFinished = false;

//check user input

function handleKey(e:KeyboardEvent) {
  if (!introFinished) return intro(e);

  if (G.end) return console.log("Game Over");
  //if the tutroial is active, then transfer key input to tutorial function and stop this function
  if (G.tutorialMode) return tutorial(e.code);
  
  if (remainingPlayBack >= 500) return; 
  if (G.conversation) return talkAI(e.code);
  if (actions.hasOwnProperty(e.code)) actions[e.code]();
}

document.addEventListener('keyup', handleKey)

function intro(e:KeyboardEvent) {
  if (!start) return startUp();
  if (e.code=="Escape") return stopScore();
}
function startUp() {
  start = true;
  score.play();
  startUI();
  G.setTutorial(true);
}

function stopScore() {
  score.stop();
  audioLength(0);
  introFinished = true;
  tutorial("ArrowUp");
}
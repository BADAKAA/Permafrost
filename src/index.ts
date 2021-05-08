import { remainingPlayBack } from "./sound";
import { tutorial } from "./tutorial";
import { closeInventory, openInventory, left, right, space } from "./inventory";
import { conversation, end, initialisePoisition, setTutorial, tutorialMode } from "./status";
import { startUI } from "./UI";
import { talkAI, enter,} from "./game-logic";
import { score } from "./sound-files";

let start:boolean = false;

//check user input
document.addEventListener('keyup', (e) => {

  if (!start) return startUp();

  if (end) return console.log("Game Over");
  //if the tutroial is active, then transfer key input to tutorial function and stop this function
  if (tutorialMode) return tutorial(e);
  
  if (conversation && remainingPlayBack < 500) return talkAI(e.code);

  if (remainingPlayBack < 500) {

    switch (e.code) {
      case "ArrowUp":
        closeInventory();
        break;
      case "ArrowDown":
        openInventory();
        break;
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "Enter":
        enter();
        break;
      case "Space":
        space();
        break;
      default:
        break;
    }
  }
})

//startUp
function startUp() {
  start = true
  score.play();
  startUI();
  initialisePoisition();
  setTutorial(true);
}
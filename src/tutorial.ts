import { closeInventory, openInventory, left, right, inventoryPos, space } from "./inventory";
import { remainingPlayBack } from "./sound";
import { AI, sfx } from "./sound-files";
import { clearHand, currentRoom, hand, inventory, selection, setTutorial } from "./status";
import { gameOver } from "./UI";


let tutorialProgress:number = 0;

export function tutorialStart() {
    setTutorial(true)
}
export function tutorial(e:KeyboardEvent) {
    if (remainingPlayBack > 300) return;
      switch (e.code) {
        case "ArrowUp":
          tutorialUp();
          break;
        case "ArrowDown":
          tutorialDown();
          break;
        case "ArrowLeft":
          tutorialLeft();
          break;
        case "ArrowRight":
          tutorialRight();
          break;
        case "Enter":
          tutorialEnter();
          break;
        case "Space":
          tutorialSpace();
          break;
        default:
          break;
      }
    
  }
  
  function tutorialUp() {
    switch (tutorialProgress) {
      case 0:
        AI.startProgram.play();
        setTimeout(function () {
          AI.arrowKeyLook.play();
        }, 1750);
        tutorialProgress++;
        break;
      case 1:
        AI.arrowKeyLook.play();
        break;
      case 2:
        AI.wrongKey.play();
        break;
      case 3:
        AI.wrongKey.play();
        break;
      case 4:
        if (hand && hand.name == "flask") {
          closeInventory();
          setTimeout(function () {
            AI.well.play();
          }, 750);
          setTimeout(function () {
            AI.enterObject.play();
          }, 2000);
          tutorialProgress++;
        }
        break;
      case 5:
        AI.wrongKey.play();
        break;
      case 6:
        sfx.quicktime.play("background");
        setTutorial(false)
        setTimeout(function () {
          if (currentRoom.name == "lab") {
            gameOver("lose");
          }
        }, 112000);
        break;
      default:
        break;
    }
  }

  function tutorialDown() {
    switch (tutorialProgress) {
      case 0:
        AI.wrongKey.play();
        break;
      case 1:
        AI.wrongKey.play();
        break;
      case 2:
        AI.wrongKey.play();
        break;
      case 3:
        openInventory();
        setTimeout(function () {
          AI.spacebarFlask.play();
        }, 1750);
        break;
      case 4:
        AI.wrongKey.play();
        break;
      case 5:
        AI.wrongKey.play();
        break;
      case 6:
        AI.fear.play();
        break;
      default:
        break;
    }
  }
  function tutorialLeft() {
    switch (tutorialProgress) {
      case 0:
        AI.wrongKey.play();
        break;
      case 1:
        left();
        if (selection.name == "pipette") {
          setTimeout(function () {
            AI.well.play();
          }, 1250);
  
          setTimeout(function () {
            AI.spaceBarObject.play();
            tutorialProgress++;
          }, 2500);
        }
        break;
      case 2:
        left();
        break;
      case 3:
        AI.wrongKey.play();
        break;
      case 4:
        AI.wrongKey.play();
        break;
      case 5:
        left();
        break;
      default:
        break;
    }
  }
  function tutorialRight() {
    switch (tutorialProgress) {
      case 0:
        AI.wrongKey.play();
        break;
      case 1:
        right();
        if (selection.name == "pipette") {
          setTimeout(function () {
            AI.well.play();
          }, 1250);
  
          setTimeout(function () {
            AI.spaceBarObject.play();
            tutorialProgress++;
          }, 2500);
  
        }
        break;
      case 2:
        right();
        break;
      case 3:
        AI.wrongKey.play();
        break;
      case 4:
        AI.wrongKey.play();
        break;
      case 5:
        right();
        break;
      default:
        break;
    }
  }
  function tutorialSpace() {
    switch (tutorialProgress) {
      case 0:
        AI.wrongKey.play();
        break;
      case 1:
        AI.wrongKey.play();
        break;
      case 2:
        if (selection.name == "flask") {
          space();
          setTimeout(function () {
            AI.flaskInBag.play();
            tutorialProgress++;
          }, 2000);
  
        } else {
          sfx.cannotTake.play();
        }
        break;
      case 3:
        space();
        tutorialProgress++;
        break;
      case 4:
        space();
        break;
      case 5:
        AI.wrongKey.play();
        break;
      default:
        break;
    }
  }
  function tutorialEnter() {
    switch (tutorialProgress) {
      case 0:
        AI.wrongKey.play();
        break;
      case 1:
        AI.wrongKey.play();
        break;
      case 2:
        AI.wrongKey.play();
        break;
      case 3:
        AI.wrongKey.play();
        break;
      case 4:
        AI.wrongKey.play();
        break;
      case 5:
        if (selection.name == "testTube" && hand && hand.name == "flask") {
          clearHand();
          inventory.splice(inventoryPos, 1);
          sfx.pour.play();
          setTimeout(function () {
            AI.tutorialFinish.play();
            tutorialProgress++;
          }, 5000);
        }
        break;
      default:
        break;
    }
  }
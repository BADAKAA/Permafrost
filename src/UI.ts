import { bg, titleElement, startText, downloadText } from "./dom-utils";
import { ambience, sfx } from "./sound-files";
import { G } from "./status";

//This variable controls the intervals in which the ambient sound is played.
let ambientSound: number //function playing ambient sound in regular intervals;

export function gameOver(status: string) {
    clearInterval(ambientSound);
    ambience.stop();
    if (status == "lose") {
      G.endGame();
      sfx.gameOver.play();
    }
    if (status == "win") {
      G.endGame();
      sfx.captain.play();
      setTimeout(function () {
        sfx.gameOver.play();
      }, 20000);
    }
  }

  export function startUI() {
    //play and repeat ambient sounds. This interval function is terminated in gameOver();
    setTimeout(() => {

        ambience.play(true);
        ambientSound = setInterval(() => {
          ambience.play(true);
        }, 165000);
      }, 125000);
    
      //show UI
      bg.style.opacity = "1";
      titleElement.style.color = "white";
      startText.style.animation = "none";
      setTimeout(() => {startText.style.opacity = "0"},100);
      setTimeout(() => {
        bg.style.opacity = "0";
        titleElement.style.color = "black";
        downloadText.style.opacity = "0";
      }, 10000);
  }
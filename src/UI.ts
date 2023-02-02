import { bg, titleElement, startText, downloadText } from "./utils/dom-utils";
import { ambience, sfx } from "./utils/sound-files";
import { G } from "./status";
import { FIRST_AMBIENT_SOUND_DELAY } from "./utils/settings";

//This variable controls the intervals in which the ambient sound is played.
let ambientSound: number //function playing ambient sound in regular intervals;

export function gameOver(status: "win"|"loss") {
    clearInterval(ambientSound);
    ambience.fade();
    if (status == "loss") {
      G.endGame();
      sfx.gameOver.play();
    }
    if (status == "win") {
      G.endGame();
      sfx.captain.play();
      setTimeout(()=> sfx.gameOver.play(), sfx.captain.duration()+1000);
    }
  }

  export function startUI() {
    //play and repeat ambient sounds. This interval function is terminated in gameOver();
    setTimeout(() => {
        ambience.play(true);
        ambientSound = setInterval(() => ambience.play(true), ambience.duration());
    }, FIRST_AMBIENT_SOUND_DELAY);
  
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
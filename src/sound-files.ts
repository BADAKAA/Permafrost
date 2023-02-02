import { sound } from "./sound";

export const score:sound = new sound("music/opening.wav");
export const ambience:sound = new sound("music/ambience.wav");

interface soundObject {
    [key: string]: sound;
 } 

//These JSON-objects store sound data.
export const AI:soundObject  ={
        "fear":             new sound("AI/fear.wav"),
        "tutorialStart":    new sound("AI/tutorialStart.wav"),
        "talented":         new sound("AI/talented.wav"),
        "wrongKey":         new sound("AI/wrongKey.wav"),
        "enterObject":      new sound("AI/enterObject.wav"),
        "fillTestTube":     new sound("AI/fillTestTube.wav"),
        "flaskInBag":       new sound("AI/flaskInBag.wav"),
        "spaceBarObject":   new sound("AI/spaceBarObject.wav"),
        "funny":            new sound("AI/funny.wav"),
        "shutDown":         new sound("AI/shutDown.wav"),
        "arrowKeyYes":      new sound("AI/arrowKeyYes.wav"),
        "arrowKeyLook":     new sound("AI/arrowKeyLook.wav"),
        "startProgram":     new sound("AI/startProgram.wav"),
        "spacebarFlask":    new sound("AI/spacebarFlask.wav"),
        "pity":             new sound("AI/pity.wav"),
        "well":             new sound("AI/well.wav"),
        "bag":              new sound("AI/bag.wav"),
        "tutorialFinish":   new sound("AI/tutorialFinish.wav"),
};        

export const sfx:soundObject = {
            "AIRestored":    new sound("sfx/AIRestored.wav"),
            "door":     new sound("sfx/door.wav"),
            "open":     new sound("sfx/open.wav"),
            "close":    new sound("sfx/close.wav"),
            "empty":    new sound("sfx/empty.wav"),
            "cannotTake":new sound("sfx/cannotTake.wav"),
            "zipper":   new sound("sfx/zipper.wav"),
            "locked":   new sound("sfx/locked.wav"),
            "took":     new sound("sfx/took.wav"),
            "activated":new sound("sfx/activated.wav"),
            "pour":     new sound("sfx/pour.wav"),
            "quicktime":new sound("sfx/quicktime.wav"),
            "openUp":   new sound("sfx/openUp.wav"),
            "grunt":    new sound("sfx/grunt.wav"),
            "yes":      new sound("sfx/yes.wav"),
            "no":       new sound("sfx/no.wav"),
            "gameOver": new sound("sfx/gameOver.wav"),
            "captain":  new sound("sfx/captain.wav")
};
import { sound } from "./sound";

export const score:sound = new sound("music/opening.ogg");
export const ambience:sound = new sound("music/ambience.ogg");

interface soundObject {
    [key: string]: sound;
 } 

//These JSON-objects store sound data.
export const AI:soundObject  ={
        "fear":             new sound("AI/fear.ogg"),
        "tutorialStart":    new sound("AI/tutorialStart.ogg"),
        "talented":         new sound("AI/talented.ogg"),
        "wrongKey":         new sound("AI/wrongKey.ogg"),
        "enterObject":      new sound("AI/enterObject.ogg"),
        "fillTestTube":     new sound("AI/fillTestTube.ogg"),
        "flaskInBag":       new sound("AI/flaskInBag.ogg"),
        "spaceBarObject":   new sound("AI/spaceBarObject.ogg"),
        "funny":            new sound("AI/funny.ogg"),
        "shutDown":         new sound("AI/shutDown.ogg"),
        "arrowKeyYes":      new sound("AI/arrowKeyYes.ogg"),
        "arrowKeyLook":     new sound("AI/arrowKeyLook.ogg"),
        "startProgram":     new sound("AI/startProgram.ogg"),
        "spacebarFlask":    new sound("AI/spacebarFlask.ogg"),
        "pity":             new sound("AI/pity.ogg"),
        "well":             new sound("AI/well.ogg"),
        "bag":              new sound("AI/bag.ogg"),
        "tutorialFinish":   new sound("AI/tutorialFinish.ogg"),
};        

export const sfx:soundObject = {
            "AIRestored":    new sound("sfx/AIRestored.ogg"),
            "door":     new sound("sfx/door.ogg"),
            "open":     new sound("sfx/open.ogg"),
            "close":    new sound("sfx/close.ogg"),
            "empty":    new sound("sfx/empty.ogg"),
            "cannotTake":new sound("sfx/cannotTake.ogg"),
            "zipper":   new sound("sfx/zipper.ogg"),
            "locked":   new sound("sfx/locked.ogg"),
            "took":     new sound("sfx/took.ogg"),
            "activated":new sound("sfx/activated.ogg"),
            "pour":     new sound("sfx/pour.ogg"),
            "quicktime":new sound("sfx/quicktime.ogg"),
            "openUp":   new sound("sfx/openUp.ogg"),
            "grunt":    new sound("sfx/grunt.ogg"),
            "yes":      new sound("sfx/yes.ogg"),
            "no":       new sound("sfx/no.ogg"),
            "gameOver": new sound("sfx/gameOver.ogg"),
            "captain":  new sound("sfx/captain.ogg")
};
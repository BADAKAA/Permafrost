import { Sound } from "../sound";

export const score:Sound = new Sound("music/opening.ogg");
export const ambience:Sound = new Sound("music/ambience.ogg");

interface soundObject {
    [key: string]: Sound;
} 

// These JSON-objects store sound data.
export const AI:soundObject  ={
        "fear":             new Sound("AI/fear.ogg"),
        "tutorialStart":    new Sound("AI/tutorialStart.ogg"),
        "talented":         new Sound("AI/talented.ogg"),
        "wrongKey":         new Sound("AI/wrongKey.ogg"),
        "enterObject":      new Sound("AI/enterObject.ogg"),
        "fillTestTube":     new Sound("AI/fillTestTube.ogg"),
        "flaskInBag":       new Sound("AI/flaskInBag.ogg"),
        "spaceBarObject":   new Sound("AI/spaceBarObject.ogg"),
        "funny":            new Sound("AI/funny.ogg"),
        "shutDown":         new Sound("AI/shutDown.ogg"),
        "arrowKeyYes":      new Sound("AI/arrowKeyYes.ogg"),
        "arrowKeyLook":     new Sound("AI/arrowKeyLook.ogg"),
        "startProgram":     new Sound("AI/startProgram.ogg"),
        "spacebarFlask":    new Sound("AI/spacebarFlask.ogg"),
        "pity":             new Sound("AI/pity.ogg"),
        "well":             new Sound("AI/well.ogg"),
        "bag":              new Sound("AI/bag.ogg"),
        "tutorialFinish":   new Sound("AI/tutorialFinish.ogg"),
};        

export const sfx:soundObject = {
            "AIRestored":    new Sound("sfx/AIRestored.ogg"),
            "door":     new Sound("sfx/door.ogg"),
            "open":     new Sound("sfx/open.ogg"),
            "close":    new Sound("sfx/close.ogg"),
            "empty":    new Sound("sfx/empty.ogg"),
            "cannotTake":new Sound("sfx/cannotTake.ogg"),
            "zipper":   new Sound("sfx/zipper.ogg"),
            "locked":   new Sound("sfx/locked.ogg"),
            "took":     new Sound("sfx/took.ogg"),
            "activated":new Sound("sfx/activated.ogg"),
            "pour":     new Sound("sfx/pour.ogg"),
            "quicktime":new Sound("sfx/quicktime.ogg"),
            "openUp":   new Sound("sfx/openUp.ogg"),
            "grunt":    new Sound("sfx/grunt.ogg"),
            "yes":      new Sound("sfx/yes.ogg"),
            "no":       new Sound("sfx/no.ogg"),
            "gameOver": new Sound("sfx/gameOver.ogg"),
            "captain":  new Sound("sfx/captain.ogg")
};
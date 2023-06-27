import { Sound } from "../sound";

export const score:Sound = new Sound("assets/sound/music/opening.ogg");
export const ambience:Sound = new Sound("assets/sound/music/ambience.ogg");

interface soundObject {
    [key: string]: Sound;
} 

// These JSON-objects store sound data.
export const AI:soundObject  ={
        "fear":             new Sound("assets/sound/AI/fear.ogg"),
        "tutorialStart":    new Sound("assets/sound/AI/tutorialStart.ogg"),
        "talented":         new Sound("assets/sound/AI/talented.ogg"),
        "wrongKey":         new Sound("assets/sound/AI/wrongKey.ogg"),
        "enterObject":      new Sound("assets/sound/AI/enterObject.ogg"),
        "fillTestTube":     new Sound("assets/sound/AI/fillTestTube.ogg"),
        "flaskInBag":       new Sound("assets/sound/AI/flaskInBag.ogg"),
        "spaceBarObject":   new Sound("assets/sound/AI/spaceBarObject.ogg"),
        "funny":            new Sound("assets/sound/AI/funny.ogg"),
        "shutDown":         new Sound("assets/sound/AI/shutDown.ogg"),
        "arrowKeyYes":      new Sound("assets/sound/AI/arrowKeyYes.ogg"),
        "arrowKeyLook":     new Sound("assets/sound/AI/arrowKeyLook.ogg"),
        "startProgram":     new Sound("assets/sound/AI/startProgram.ogg"),
        "spacebarFlask":    new Sound("assets/sound/AI/spacebarFlask.ogg"),
        "pity":             new Sound("assets/sound/AI/pity.ogg"),
        "well":             new Sound("assets/sound/AI/well.ogg"),
        "bag":              new Sound("assets/sound/AI/bag.ogg"),
        "tutorialFinish":   new Sound("assets/sound/AI/tutorialFinish.ogg"),
};        

export const sfx:soundObject = {
            "AIRestored":    new Sound("assets/sound/sfx/AIRestored.ogg"),
            "door":     new Sound("assets/sound/sfx/door.ogg"),
            "open":     new Sound("assets/sound/sfx/open.ogg"),
            "close":    new Sound("assets/sound/sfx/close.ogg"),
            "empty":    new Sound("assets/sound/sfx/empty.ogg"),
            "cannotTake":new Sound("assets/sound/sfx/cannotTake.ogg"),
            "zipper":   new Sound("assets/sound/sfx/zipper.ogg"),
            "locked":   new Sound("assets/sound/sfx/locked.ogg"),
            "took":     new Sound("assets/sound/sfx/took.ogg"),
            "activated":new Sound("assets/sound/sfx/activated.ogg"),
            "pour":     new Sound("assets/sound/sfx/pour.ogg"),
            "quicktime":new Sound("assets/sound/sfx/quicktime.ogg"),
            "openUp":   new Sound("assets/sound/sfx/openUp.ogg"),
            "grunt":    new Sound("assets/sound/sfx/grunt.ogg"),
            "yes":      new Sound("assets/sound/sfx/yes.ogg"),
            "no":       new Sound("assets/sound/sfx/no.ogg"),
            "gameOver": new Sound("assets/sound/sfx/gameOver.ogg"),
            "captain":  new Sound("assets/sound/sfx/captain.ogg")
};
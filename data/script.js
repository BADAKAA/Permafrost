//decleration of variables
var end=false;
var start=false;
var tutorialProgress=0;
var tutorialMode=false;
var conversation=false;

//navigational variables
var position;
var selection;
var selectionNumber;

//inventory
var hand;
var currentItem;
var inventory=[];
var inventoryPos = 0;
var inventoryStatus = false;

//sound objects
var score;
var ambience;
//These variables control audio playback time and are responsible for deactivating user input while non-ambient audio is playing.
var remainingPlayBack = 0;
var background=false;
//This variable controls the intervals in which the ambient sound is played.
var ambientSound;
//These JSON-objects store sound data.
var AI={"fear": new sound("AI/fear.wav"),
        "tutorialStart": new sound("AI/tutorialStart.wav"),
        "talented": new sound("AI/talented.wav"),
        "wrongKey": new sound("AI/wrongKey.wav"),
        "enterObject": new sound("AI/enterObject.wav"),
        "fillTestTube": new sound("AI/fillTestTube.wav"),
        "flaskInBag": new sound("AI/flaskInBag.wav"),
        "spaceBarObject": new sound("AI/spaceBarObject.wav"),
        "funny": new sound("AI/funny.wav"),
        "shutDown": new sound("AI/shutDown.wav"),
        "arrowKeyYes": new sound("AI/arrowKeyYes.wav"),
        "arrowKeyLook": new sound("AI/arrowKeyLook.wav"),
        "startProgram": new sound("AI/startProgram.wav"),
        "spacebarFlask": new sound("AI/spacebarFlask.wav"),
        "pity": new sound("AI/pity.wav"),
        "well": new sound("AI/well.wav"),
        "bag": new sound("AI/bag.wav"),
        "tutorialFinish": new sound("AI/tutorialFinish.wav"),
        };        

var sfx=   {"AIRestored":    new sound("sfx/AIRestored.wav"),
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
            "captain": new sound("sfx/captain.wav")
            };

//data types (just for not having to write quotation marks during type decleration)
var room=   "room";
var item=   "item";
var object= "object";

//items
var flask=      {name: "flask",         type:item,     sound: [new sound("player/item/flask.wav"),   new sound("player/item/flask2.wav")]};
var crowbar=    {name: "crowbar",       type:item,     sound: [new sound("player/item/crowbar.wav"), new sound("player/item/crowbar2.wav")]};
var food=       {name: "food",          type:item,     sound: [new sound("player/item/food.wav"),    new sound("player/item/food2.wav")]};
var bottle=     {name: "bottle",        type:item,     sound: [new sound("player/item/bottle.wav"),  new sound("player/item/bottle2.wav")]};
var pipette=    {name: "pipette",       type:item,     sound: [new sound("player/item/pipette.wav"), new sound("player/item/pipette2.wav")]};
var mediKit=    {name: "mediKit",       type:item,     sound: [new sound("player/item/mediKit.wav"), new sound("player/item/mediKit2.wav")]};
var disk=       {name: "disk",          type:item,     sound: [new sound("player/item/disk.wav"),    new sound("player/item/disk2.wav")]};

//objects
var testTube=   {name: "testTube",      type:object,      sound:  [new sound("player/object/testTube.wav"),   new sound("player/object/testTube2.wav")]};
var suits=      {name: "suits",         type:object,      sound:  [new sound("player/object/suits.wav"),      new sound("player/object/suits2.wav")]};
var captain=    {name: "captain",       type:object,      sound:  [new sound("player/object/captain.wav")]};
var slit=       {name: "slit",           type:object,     sound:  [new sound("player/object/slit.wav"),      new sound("player/object/slit2.wav")]};

//rooms
var hallway1=   {name: "hallway1",      locked:true,        type:room,      options:["cafeteria", "wardrobe", slit, "lab", "hallway2"], sound: [new sound("player/room/door.wav"), new sound("player/room/floor1.wav")]};
var hallway2=   {name: "hallway2",      locked:true,        type:room,      options:["lockedRoom","lockedDoor","bridge","hallway1"],    sound: [new sound("player/room/securityDoor2.wav"), new sound("player/room/securityDoor.wav")]};
var lab=        {name: "lab",           locked:false,       type:room,      options:[crowbar, flask, pipette, testTube, "hallway1"],    sound: [new sound("player/room/lab.wav"), new sound("player/room/lab2.wav")]};
var cafeteria=  {name: "cafeteria",     locked:false,       type:room,      options:[mediKit, food, bottle, "hallway1"],                sound: [new sound("player/room/cafeteria.wav")]};
var wardrobe=   {name: "wardrobe",      locked:false,       type:room,      options:[suits, disk, "hallway1"],                          sound: [new sound("player/room/wardrobe.wav")]};
var bridge=     {name: "bridge",        locked:false,       type:room,      options:["captain", "hallway1"],                            sound: [new sound("player/room/bridge.wav")]};
var lockedRoom= {name: "lockedRoom",    locked:true,        type:room,      sound:  [new sound("player/room/lockedR.wav")]};
var lockedDoor= {name: "lockedDoor",    locked:true,        type:room,      sound:  [new sound("player/room/lockedD.wav")]};

let rooms=[];
rooms[0] = hallway1;
rooms[1] = hallway2;
rooms[2] = lab;
rooms[3] = cafeteria;
rooms[4] = wardrobe;
rooms[5] = bridge;
rooms[6] = lockedRoom;
rooms[7] = lockedDoor;

 
//enable audio output
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();

        if (!background) {
            audioLength(this.sound.duration);
        } else {
            background=false;
            audioLength(5);
        }
         
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  function audioLength(duration) {

    remainingPlayBack=duration*1000;
    var playback= setInterval(function counter(){
        remainingPlayBack=remainingPlayBack-100;
        if (remainingPlayBack<100) {
            remainingPlayBack=0;
            clearInterval(playback);
        }
    }, 100);
}
//loading animation
window.onload = 
function titleOpacity(){    
    document.getElementById("title").style.opacity = "1";
}
    
setTimeout(function(){
    document.getElementById("start").style.opacity = "1";
}, 2000);
 
//update selection
function turn(direction) {
    //check direction
        if (direction=="right") {
            if( selectionNumber === position.options.length-1){
                selectionNumber = 0;
                } else {
                    selectionNumber++;
                }
        }
        if (direction=="left") {
 
            if( selectionNumber === 0){
                selectionNumber = position.options.length-1; 
                } else {
                    selectionNumber--;
                }
                }
        if (direction=="item") {
            if( selectionNumber === position.options.length-1){
                selectionNumber = 0;
                } else {
                    selectionNumber++;
                }
            }
                
        selection=position.options[selectionNumber];

        if (direction!="item") {
        console.log(selection);
        if (selection.type=="item" || selection.type == "object") {
                    selection.sound[0].play();
        } else {
            for (i=0; i<rooms.length;i++) {           
        if (rooms[i].name == selection) {

                        rooms[i].sound[0].play();
                    
            }}}      
    }
if (selection=="hallway2" && hallway2.sound.length>1) {

    hallway2.sound.splice(0,1)

}
}
//startUp
function startUp() {
//play score 
score = new sound("music/opening.wav");
ambience = new sound("https://drive.google.com/uc?export=view&id=1RNtUmUNF6E_aqiO4A9Lv0xOtdFL1LKc0");
score.play();
//play and repeat ambient sounds. This interval function is terminated in gameOver();
setTimeout(function(){
    background=true;
    ambience.play();
    ambientSound=   setInterval(function counter(){
                    background=true;
                    ambience.play();
    }, 165000);
}, 125000);

//show UI
document.getElementById("background").style.opacity = "1";
document.getElementById("title").style.color = "white";
document.getElementById("start").style.opacity = "0";
setTimeout(function showBG(){
    document.getElementById("background").style.opacity = "0";
    document.getElementById("title").style.color = "black";
    document.getElementById("start").style.opacity = "0";
}, 10000);

//set Position
    position=rooms[2];
    selectionNumber=0;
}

//start tutorial
tutorialMode=true;


//check user input
document.addEventListener('keyup', (e) => {
    if (!start) {
        start=true;
        startUp();
    } else if (end==true) {
        console.log("Game Over");
    } else if (remainingPlayBack<500 && !tutorialMode&& !conversation) {
            
    switch(e.code) {
        case "ArrowUp":
          up();
          break;
        case "ArrowDown":
          down();
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
    } else if (tutorialMode==true && remainingPlayBack<300){
    tutorial(e);
    } else if (conversation && remainingPlayBack<500) {
        switch(e.code) {
            case "ArrowUp":
                talkAI("yes");
            break;
            case "ArrowDown":
                talkAI("no");
            break;
        }
    }
}
)

function up() {
    console.log("Hoch");
    if (inventoryStatus === true){
        inventoryStatus = false;
        sfx.close.play();}
        else {
    console.log(position.options.length);
        }
}
 
function down() {
    console.log("RUUUUNTA!");
    if (!inventoryStatus) {
    openInventory();
    }
}
 
function left() {
    if (!conversation) {
        if (inventoryStatus === true){
            switchInventory("left");
        }   else {
        turn("left");
        }
    }
}
 
function right() {
    if (!conversation) {
        if(inventoryStatus === true){
            switchInventory("right")}
            else    {
        turn("right");
            }
    }
}
 
function enter() {
if (selection==="lockedRoom"|| selection==="lockedDoor") {
    console.log("verschlossen");
    sfx.locked.play();
} else if (position==lab && selection=="hallway1" && hand==crowbar) {
    changeRoom();
} else if (selection=="lab") {
    lab.sound[1].play();
} else if (selection==slit && hand==disk){
    talkAI("start");
} else if (selection.type=="item" || selection.type=="object") {
    selection.sound[1].play();
} else if(selection=="bridge") {
    gameOver("win");
} else {
   changeRoom();
}
}
 
function space() {
 
    console.log("Space");
    if (inventoryStatus) {
        sfx.activated.play();
        hand=inventory[inventoryPos];
        console.log(hand);
    } else {
    getItem();
}
}
 
 
function openInventory(){
    inventoryPos = 0;
    sfx.open.play();
    inventoryStatus = true;
    inventory.forEach(element => {
        console.log(element);
    });
setTimeout(function(){
    if (inventory.length > 0 && inventory[inventoryPos].type=="item") {
        inventory[inventoryPos].sound[0].play();
};
if (inventory.length === 0) {
    sfx.empty.play();
}
}, 750);
}

 
 
function getItem() {
    if (!inventoryStatus) {
    if(selectionNumber === position.options.length-1 || position.options[selectionNumber] === "Leer" || position.options[selectionNumber].type !== "item"){
        console.log("Das kann ich nicht mitnehmen");
        sfx.cannotTake.play();
        
    }   else {
    inventory[inventory.length] = position.options[selectionNumber];
    position.options.splice(selectionNumber, 1);
    sfx.zipper.play();
    if (!tutorialMode) {
    setTimeout(function(){
        sfx.took.play();
    }, 1250);
    }
    }
    turn("item");
}
}
 
function switchInventory(direction){

    if (inventory.length === 0){
        sfx.empty.play();
        console.log("Meine Tasche ist leer.");
    } else if (direction=="right") {
    if(inventoryPos === 0){
        inventoryPos = inventory.length-1;
    } else  {
        inventoryPos--;
    }
    } else if (direction=="left") {
        
        if(inventoryPos === inventory.length-1){
            inventoryPos = 0;
        } else  {
            inventoryPos ++;
        }
        console.log(inventory[inventoryPos].name);
    }
    if (inventory.length != 0 && inventory[inventoryPos].type=="item") {
        inventory[inventoryPos].sound[0].play();
} 
    }

function tutorial(e) {
if (remainingPlayBack<300) {
    switch(e.code) {
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
}

function tutorialUp() {
    switch(tutorialProgress) {
        case 0:
            AI.startProgram.play();
            setTimeout(function(){
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
            if (hand==flask) {
                up();
                setTimeout(function(){
                    AI.well.play();
                }, 750);
                setTimeout(function(){
                    AI.enterObject.play();
                }, 2000);
                tutorialProgress++;
            }
            break;
        case 5:
            AI.wrongKey.play();
            break;
        case 6:
            background=true;
            sfx.quicktime.play();
            tutorialMode=false;
            setTimeout(function(){
                if (position==lab) {
                    gameOver("lose");
                }
            }, 112000);
            break;    
        default:
            break;
    }
}
function tutorialDown() {
    switch(tutorialProgress) {
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
            down();
                setTimeout(function(){
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
    switch(tutorialProgress) {
        case 0:
            AI.wrongKey.play();
          break;
        case 1:
            left();
            if (selection==pipette) {
                setTimeout(function(){
                    AI.well.play();
                }, 1250);
                
                setTimeout(function(){
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
    switch(tutorialProgress) {
        case 0:
            AI.wrongKey.play();
          break;
        case 1:
            right();
            if (selection==pipette) {
                setTimeout(function(){
                    AI.well.play();
                }, 1250);
                
                setTimeout(function(){
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
    switch(tutorialProgress) {
        case 0:
            AI.wrongKey.play();
          break;
        case 1:
            AI.wrongKey.play();
          break;
        case 2:
            if(selection==flask) {
                space();
                setTimeout(function(){
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
    switch(tutorialProgress) {
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
            if (selection==testTube && hand==flask) {
                hand=null;
                inventory.splice(inventoryPos, 1);
                sfx.pour.play();
                setTimeout(function(){
                    AI.tutorialFinish.play();
                    tutorialProgress++;
                }, 5000);
            }
            break;
        default:
            break;
}
}
function talkAI(command) {
    if (command=="start") {
        sfx.AIRestored.play();
        hand=null;
        position.options.splice(selectionNumber, 1);
        hallway2.locked=false;
        conversation=true;
    }
    if (command=="yes") {
        sfx.yes.play();
        conversation=false;
    }
    if (command=="no") {
        sfx.no.play();
        conversation=false;
    }
}
function gameOver(status) {
    clearInterval(ambientSound);
    ambience.stop();
    if (status=="lose") {
    end=true;
    sfx.gameOver.play();
    }
    if (status=="win") {
        end=true;
        sfx.captain.play();
        setTimeout(function(){
            sfx.gameOver.play();
        }, 20000);
    }
}
function changeRoom() {
    for (let index = 0; index < rooms.length; index++) {
        if (position.options[selectionNumber]===rooms[index].name) {
            if (hand==crowbar && position==lab) {
                hallway1.locked = false;
                hallway1.sound.splice(0, 1);
                sfx.openUp.play();

                position = rooms[index];
                selectionNumber = 0;
                index = rooms.length;
                setTimeout(function(){
                    sfx.quicktime.stop();
                }, 8000);
                hand=null;
            }  else if (!rooms[index].locked) {
                position = rooms[index];
                selectionNumber = 0;
                index = rooms.length;
                sfx.door.play();
                console.log("Raum gewechselt");
            } else {
                console.log("verschlossen");
                sfx.locked.play();
        }
    }
    }
}
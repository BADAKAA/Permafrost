import { sound } from "./sound";

export interface GameObject {
    name:string,
    type:string,
    sound:Array<sound>,
    locked?:boolean,
}

export interface room extends GameObject {
    options: Array<string>,
    locked:boolean
}

//data types (just for not having to write quotation marks during type decleration)
const room=   "room";
const item=   "item";
const object= "object";

export const gameObjects:GameObject[]=[

//items
{name: "flask",         type:item,     sound: [new sound("player/item/flask.wav"),   new sound("player/item/flask2.wav")]},
{name: "crowbar",       type:item,     sound: [new sound("player/item/crowbar.wav"), new sound("player/item/crowbar2.wav")]},
{name: "food",          type:item,     sound: [new sound("player/item/food.wav"),    new sound("player/item/food2.wav")]},
{name: "bottle",        type:item,     sound: [new sound("player/item/bottle.wav"),  new sound("player/item/bottle2.wav")]},
{name: "pipette",       type:item,     sound: [new sound("player/item/pipette.wav"), new sound("player/item/pipette2.wav")]},
{name: "mediKit",       type:item,     sound: [new sound("player/item/mediKit.wav"), new sound("player/item/mediKit2.wav")]},
{name: "disk",          type:item,     sound: [new sound("player/item/disk.wav"),    new sound("player/item/disk2.wav")]},



//objects
{name: "testTube",      type:object,      sound:  [new sound("player/object/testTube.wav"),   new sound("player/object/testTube2.wav")]},
{name: "suits",         type:object,      sound:  [new sound("player/object/suits.wav"),      new sound("player/object/suits2.wav")]},
{name: "captain",       type:object,      sound:  [new sound("player/object/captain.wav")]},
{name: "slit",          type:object,      sound:  [new sound("player/object/slit.wav"),      new sound("player/object/slit2.wav")]},
]
export const rooms:room[]= [
//rooms
{name: "hallway1",      locked:true,        type:room,      options:["cafeteria", "wardrobe", "slit", "lab", "hallway2"],   sound: [new sound("player/room/door.wav"), new sound("player/room/floor1.wav")]},
{name: "hallway2",      locked:true,        type:room,      options:["lockedRoom","lockedDoor","bridge","hallway1"],        sound: [new sound("player/room/securityDoor2.wav"), new sound("player/room/securityDoor.wav")]},
{name: "lab",           locked:false,       type:room,      options:["crowbar", "flask", "pipette", "testTube", "hallway1"],sound: [new sound("player/room/lab.wav"), new sound("player/room/lab2.wav")]},
{name: "cafeteria",     locked:false,       type:room,      options:["mediKit", "food", "bottle", "hallway1"],              sound: [new sound("player/room/cafeteria.wav")]},
{name: "wardrobe",      locked:false,       type:room,      options:["suits", "disk", "hallway1"],                          sound: [new sound("player/room/wardrobe.wav")]},
{name: "bridge",        locked:false,       type:room,      options:["captain", "hallway1"],                                sound: [new sound("player/room/bridge.wav")]},
{name: "lockedRoom",    locked:true,        type:room,      options:[], sound:  [new sound("player/room/lockedR.wav")]},
{name: "lockedDoor",    locked:true,        type:room,      options:[], sound:  [new sound("player/room/lockedD.wav")]},
];

export function getGameObject(name:string) {

    for(const object of gameObjects) {
        if (object.name===name) return object;
    }

    for(const room of rooms) {
        if (room.name===name) return room;
    }
    return gameObjects[0];
}
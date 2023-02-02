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
{name: "flask",         type:item,     sound: [new sound("player/item/flask.ogg"),   new sound("player/item/flask2.ogg")]},
{name: "crowbar",       type:item,     sound: [new sound("player/item/crowbar.ogg"), new sound("player/item/crowbar2.ogg")]},
{name: "food",          type:item,     sound: [new sound("player/item/food.ogg"),    new sound("player/item/food2.ogg")]},
{name: "bottle",        type:item,     sound: [new sound("player/item/bottle.ogg"),  new sound("player/item/bottle2.ogg")]},
{name: "pipette",       type:item,     sound: [new sound("player/item/pipette.ogg"), new sound("player/item/pipette2.ogg")]},
{name: "mediKit",       type:item,     sound: [new sound("player/item/mediKit.ogg"), new sound("player/item/mediKit2.ogg")]},
{name: "disk",          type:item,     sound: [new sound("player/item/disk.ogg"),    new sound("player/item/disk2.ogg")]},



//objects
{name: "testTube",      type:object,      sound:  [new sound("player/object/testTube.ogg"),   new sound("player/object/testTube2.ogg")]},
{name: "suits",         type:object,      sound:  [new sound("player/object/suits.ogg"),      new sound("player/object/suits2.ogg")]},
{name: "captain",       type:object,      sound:  [new sound("player/object/captain.ogg")]},
{name: "slit",          type:object,      sound:  [new sound("player/object/slit.ogg"),      new sound("player/object/slit2.ogg")]},
]
export const rooms:room[]= [
//rooms
{name: "hallway1",      locked:true,        type:room,      options:["cafeteria", "wardrobe", "slit", "lab", "hallway2"],   sound: [new sound("player/room/door.ogg"), new sound("player/room/floor1.ogg")]},
{name: "hallway2",      locked:true,        type:room,      options:["lockedRoom","lockedDoor","bridge","hallway1"],        sound: [new sound("player/room/securityDoor2.ogg"), new sound("player/room/securityDoor.ogg")]},
{name: "lab",           locked:false,       type:room,      options:["crowbar", "flask", "pipette", "testTube", "hallway1"],sound: [new sound("player/room/lab.ogg"), new sound("player/room/lab2.ogg")]},
{name: "cafeteria",     locked:false,       type:room,      options:["mediKit", "food", "bottle", "hallway1"],              sound: [new sound("player/room/cafeteria.ogg")]},
{name: "wardrobe",      locked:false,       type:room,      options:["suits", "disk", "hallway1"],                          sound: [new sound("player/room/wardrobe.ogg")]},
{name: "bridge",        locked:false,       type:room,      options:["captain", "hallway1"],                                sound: [new sound("player/room/bridge.ogg")]},
{name: "lockedRoom",    locked:true,        type:room,      options:[], sound:  [new sound("player/room/lockedR.ogg")]},
{name: "lockedDoor",    locked:true,        type:room,      options:[], sound:  [new sound("player/room/lockedD.ogg")]},
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
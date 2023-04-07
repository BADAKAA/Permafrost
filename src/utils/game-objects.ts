import { Sound } from '../sound';

type ObjectType = 'room' | 'item' | 'object';

export interface GameObject {
    name: string,
    type: ObjectType,
    sound: Array<Sound>,
    locked?: boolean,
}

export interface room extends GameObject {
    options: Array<string>,
    locked: boolean
}

export const gameObjects:GameObject[] = [

//items
{name: 'flask',         type:'item',     sound: [new Sound('player/item/flask.ogg'),   new Sound('player/item/flask2.ogg')]},
{name: 'crowbar',       type:'item',     sound: [new Sound('player/item/crowbar.ogg'), new Sound('player/item/crowbar2.ogg')]},
{name: 'food',          type:'item',     sound: [new Sound('player/item/food.ogg'),    new Sound('player/item/food2.ogg')]},
{name: 'bottle',        type:'item',     sound: [new Sound('player/item/bottle.ogg'),  new Sound('player/item/bottle2.ogg')]},
{name: 'pipette',       type:'item',     sound: [new Sound('player/item/pipette.ogg'), new Sound('player/item/pipette2.ogg')]},
{name: 'mediKit',       type:'item',     sound: [new Sound('player/item/mediKit.ogg'), new Sound('player/item/mediKit2.ogg')]},
{name: 'disk',          type:'item',     sound: [new Sound('player/item/disk.ogg'),    new Sound('player/item/disk2.ogg')]},



//objects
{name: 'testTube',      type:'object',      sound:  [new Sound('player/object/testTube.ogg'),   new Sound('player/object/testTube2.ogg')]},
{name: 'suits',         type:'object',      sound:  [new Sound('player/object/suits.ogg'),      new Sound('player/object/suits2.ogg')]},
{name: 'captain',       type:'object',      sound:  [new Sound('player/object/captain.ogg')]},
{name: 'slit',          type:'object',      sound:  [new Sound('player/object/slit.ogg'),      new Sound('player/object/slit2.ogg')]},
]
export const rooms:room[] = [
//rooms
{name: 'hallway1',      locked:true,        type:'room',      options:['cafeteria', 'wardrobe', 'slit', 'lab', 'hallway2'],   sound: [new Sound('player/room/door.ogg'), new Sound('player/room/floor1.ogg')]},
{name: 'hallway2',      locked:true,        type:'room',      options:['lockedRoom','lockedDoor','bridge','hallway1'],        sound: [new Sound('player/room/securityDoor2.ogg'), new Sound('player/room/securityDoor.ogg')]},
{name: 'lab',           locked:false,       type:'room',      options:['crowbar', 'flask', 'pipette', 'testTube', 'hallway1'],sound: [new Sound('player/room/lab.ogg'), new Sound('player/room/lab2.ogg')]},
{name: 'cafeteria',     locked:false,       type:'room',      options:['mediKit', 'food', 'bottle', 'hallway1'],              sound: [new Sound('player/room/cafeteria.ogg')]},
{name: 'wardrobe',      locked:false,       type:'room',      options:['suits', 'disk', 'hallway1'],                          sound: [new Sound('player/room/wardrobe.ogg')]},
{name: 'bridge',        locked:false,       type:'room',      options:['captain', 'hallway1'],                                sound: [new Sound('player/room/bridge.ogg')]},
{name: 'lockedRoom',    locked:true,        type:'room',      options:[], sound:  [new Sound('player/room/lockedR.ogg')]},
{name: 'lockedDoor',    locked:true,        type:'room',      options:[], sound:  [new Sound('player/room/lockedD.ogg')]},
];

export function getGameObject(name:string) {
    return gameObjects.find(o=>o.name===name) ?? rooms.find(r=>r.name===name) ?? gameObjects[0];
}
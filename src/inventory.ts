import { GameObject as GameObject } from "./utils/game-objects";
import { sfx } from "./utils/sound-files";
import { Direction } from "./types/Direction";

class Inventory {

  #items: GameObject[] = [];
  #position:number = 0;
  #active = false;
  isActive = () => this.#active;

  print = () => console.log("Inventory",this.#items.map(i=>i.name));

  movePosition(direction:Direction) {
    if (direction=="right") {
      return this.#position === 0 ? this.#position = this.#items.length - 1 : this.#position--;
    }
    
    this.#position === this.#items.length - 1 ? this.#position = 0 : this.#position++;
  }

  move(direction:Direction) {
    if (this.#items.length === 0) {
      console.log("Meine Tasche ist leer.");
      return sfx.empty.play();
    } 
    this.movePosition(direction);
    console.log("Hand:",this.#items[this.#position].name);

    if (this.#items[this.#position].type !== "item") return; // why is this necessary?
    this.#items[this.#position].sound[0].play();
  }

  length = () => this.#items.length;
  get = (index:number) => this.#items[index];
  getSelected = () => this.#items[this.#position];
  getLast = () => this.#items[this.#items.length-1];

  push = (o:GameObject) => this.#items.push(o);
  removeCurrent = () => this.#items.splice(this.#position, 1) 
 

  open() {
    if(this.#active) return;
    
    this.print();
    this.#active = true;
    this.#position = 0;
    sfx.open.play();
    const itemCount = this.#items.length;
    const selection = this.#items[this.#position]; 

    setTimeout (() => {
      if (itemCount <= 0) return sfx.empty.play();
      selection.sound[0].play();
    }, sfx.open.duration());
  }

  close() {
    if (!this.#active) return console.warn("Inventory is already closed.");
    this.#active = false;
    sfx.close.play();
  }
}

export const I:Inventory = new Inventory();

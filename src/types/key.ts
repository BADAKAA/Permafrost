const keyConversions:{[key:string]:Key} = {
    w:"ArrowUp",
    s:"ArrowDown",
    a:"ArrowLeft",
    d:"ArrowRight",
    NumpadEnter:"Enter",
}

const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Space", "Escape"] as const;
type Key = typeof keys[number];

const isValidKey= (key:string): key is Key => key in keys;

const convertKey = (key:string) => key in keyConversions ? keyConversions[key] : key;

function validateKey(e:KeyboardEvent): Key|null  {
    const key = convertKey(e.key);
    return  isValidKey(key) ? key : null;
}

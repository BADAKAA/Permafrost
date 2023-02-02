const keyConversions: { [key: string]: Key } = {
    w: "ArrowUp",
    s: "ArrowDown",
    a: "ArrowLeft",
    d: "ArrowRight",
    NumpadEnter: "Enter",
}

const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Space", "Escape"];
export type Key = typeof keys[number];

const isValidKey = (key: string): key is Key => keys.indexOf(key) != -1;

const convertKey = (key: string) => key in keyConversions ? keyConversions[key] : key;

export function validateKey(e: KeyboardEvent): Key | null {
    const key = convertKey(e.key);
    return isValidKey(key) ? key : null;
}

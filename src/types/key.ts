const keyConversions: { [key: string]: Key } = {
    w: "ArrowUp",
    s: "ArrowDown",
    a: "ArrowLeft",
    d: "ArrowRight",
    " ": "Space",
    NumpadEnter: "Enter",
}

const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Space", "Escape"] as const;
export type Key = typeof keys[number];

const isValidKey = (key: string): key is Key => !!keys.find(k=>k==key);

const convertKey = (key: string) => key in keyConversions ? keyConversions[key] : key;

export function validateKey(e: KeyboardEvent): Key | null {
    const key = convertKey(e.key);
    return isValidKey(key) ? key : null;
}

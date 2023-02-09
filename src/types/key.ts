const keyConversions: Map<string, Key> = new Map([
    ['w', 'ArrowUp'],
    ['s', 'ArrowDown'],
    ['a', 'ArrowLeft'],
    ['d', 'ArrowRight'],
    [' ', 'Space'],
    ['NumpadEnter', 'Enter'],
])

const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Escape'] as const;
export type Key = typeof keys[number];

const isValidKey = (key: string): key is Key => !!keys.find(k=>k==key);

const convertKey = (key: string) => keyConversions.get(key) ?? key;

export function validateKey(e: KeyboardEvent): Key | null {
    const key = convertKey(e.key);
    return isValidKey(key) ? key : null;
}

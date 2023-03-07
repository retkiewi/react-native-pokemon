import { SPRITE_BASE_URL } from "./consts";

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const spriteToGitHubUri = (spritePath: string) => (SPRITE_BASE_URL + spritePath.split('media')[1]);

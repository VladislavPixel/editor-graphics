import { writable } from "svelte/store";
import type { Theme } from "../interface";

export const storeThemeEditor = writable<Theme>("dark");

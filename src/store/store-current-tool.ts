import { writable } from "svelte/store";
import type { Tool } from "../interface";

export const storeCurrentTool = writable<null | Tool>(null);

import { writable } from "svelte/store";
import type { IEnginCanvas } from "../interface";
import { EnginCanvas } from "../engin-canvas/engin-canvas";

export const storeEnginCanvas = writable<IEnginCanvas>(new EnginCanvas());

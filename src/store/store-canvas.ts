import { writable } from "svelte/store";
import type { ICanvas } from "../interface";
import { Canvas } from "../canvas/canvas";

export const storeCanvas = writable<ICanvas>(new Canvas());

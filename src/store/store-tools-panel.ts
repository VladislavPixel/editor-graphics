import { writable } from "svelte/store";
import type { IPanel } from "../interface";

export const storeToolsPanel = writable<IPanel>({
	position: "left",
	status: true
});

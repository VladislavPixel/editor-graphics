import { writable } from "svelte/store";
import type { IPanel } from "../interface";

export const storeLayersPanel = writable<IPanel>({
	position: "right",
	status: true
});

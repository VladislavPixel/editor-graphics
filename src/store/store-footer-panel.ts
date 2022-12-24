import { writable } from "svelte/store";
import type { IPanel } from "../interface";

export const storeFooterPanel = writable<IPanel>({
	status: true,
	position: "bottom"
});

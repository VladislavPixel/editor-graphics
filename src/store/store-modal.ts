import { writable } from "svelte/store";
import type { IModal } from "../interface";
import { Modal } from "../modal/modal";

export const storeModal = writable<IModal>(new Modal());

import "./scss/style.scss"
import App from "./App.svelte"

const root = document.getElementById("app") as HTMLElement;

const app = new App({
	target: root,
})

export default app

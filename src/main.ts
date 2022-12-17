import "./scss/style.scss";
import App from "./app.svelte";

const root = document.getElementById("app") as HTMLElement;

const app = new App({
	target: root
});

export default app;

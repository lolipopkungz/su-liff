import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";

import App from "./App";
import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme hasBackground={true}>
			<App />
		</Theme>
	</StrictMode>
);

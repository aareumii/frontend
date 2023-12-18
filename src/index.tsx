// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
// eslint-disable-next-line @typescript-eslint/naming-convention
import ReactDOM from "react-dom/client";
import "./index.css";
// eslint-disable-next-line @typescript-eslint/naming-convention
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {store} from "./redux/store/store";
import {Provider} from "react-redux";
import {GlobalStyle} from "./styles/Globalstyle";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<Provider store={store}>
		<GlobalStyle />
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>
);

reportWebVitals();

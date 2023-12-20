// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "./components/layout/Layout";
// eslint-disable-next-line @typescript-eslint/naming-convention
import NotFound from "./pages/not-found/NotFound";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout></Layout>} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;

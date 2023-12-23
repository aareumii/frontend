import React from "react";

import Layout from "./components/layout/Layout";
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

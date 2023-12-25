import React from "react";

import Layout from "./components/layout/Layout";
import NotFound from "./pages/not-found/NotFound";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import ModalManager from "./components/modal/ModalManager";

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout></Layout>} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<ModalManager />
		</div>
	);
};

export default App;

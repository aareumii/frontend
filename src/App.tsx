// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "./components/layout/Layout";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout></Layout>} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;

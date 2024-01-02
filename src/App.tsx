// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "./components/layout/Layout";
// eslint-disable-next-line @typescript-eslint/naming-convention
import NewPost from "./pages/post/NewPost";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/naming-convention
import EditPost from "./pages/post/EditPost";

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout></Layout>} />
					<Route path="/archive" element={<NewPost />} />
					<Route path="/editpost/:documentId" element={<EditPost />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;

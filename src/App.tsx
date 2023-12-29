// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
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
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />}/>
					<Route path="/archive" element={<NewPost />} />
					<Route path="/editpost/:postId" element={<EditPost />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;

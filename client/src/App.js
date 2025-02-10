import Keyboards from "./pages/keyboards.js";
import Navbar from "./components/navbar.js";
import { Route, Routes } from "react-router-dom";



function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Keyboards />}></Route>
			</Routes>
		</div>
	);
}

export default App;

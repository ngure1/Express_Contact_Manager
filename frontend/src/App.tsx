import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Favourites } from "./pages/index";
import Sidebar from "./components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
	return (
		<main>
			<ChakraProvider>
				<Router>
					<Sidebar />
					<div className="ml-[27%] sm:ml-[14%] border border-black min-h-screen p-3 bg-pink-200 rounded-md">
						<Routes>
							<Route
								path="/"
								Component={Home}
							></Route>
							<Route
								path="/favourites"
								Component={Favourites}
							></Route>
						</Routes>
					</div>
				</Router>
			</ChakraProvider>
		</main>
	);
};

export default App;

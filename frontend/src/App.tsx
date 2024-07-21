import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { Home, Favourites, Authentication } from "./pages/index";
import Sidebar from "./components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";

const AppContent = () => {
	const location = useLocation();
	const isAuthPage = location.pathname === "/auth";

	return (
		<>
			{!isAuthPage && <Sidebar />}
			<div
				className={
					!isAuthPage
						? "ml-[27%] sm:ml-[20%] min-h-screen p-3 rounded-md"
						: "min-h-screen p-3"
				}
			>
				<Routes>
					<Route
						path="/"
						Component={Home}
					/>
					<Route
						path="/favourites"
						Component={Favourites}
					/>
					<Route
						path="/auth"
						Component={Authentication}
					/>
				</Routes>
			</div>
		</>
	);
};

const App = () => {
	return (
		<main>
			<ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
				<Router>
					<AppContent />
				</Router>
			</ChakraProvider>
		</main>
	);
};

export default App;

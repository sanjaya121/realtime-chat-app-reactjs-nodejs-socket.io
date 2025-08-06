import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home';

function App() {
	return (
		<div className='app-home'>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
			</Routes>
		</div>
	);
}

export default App;

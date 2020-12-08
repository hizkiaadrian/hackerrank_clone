import React from 'react';
import './App.css';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import AppRouter from './components/AppRouter';

function App() {
	return (
		<>
			<TopNav/>
			<div className="App">
				<AppRouter/>
			</div>
			<Footer />
		</>
	);
};

export default App;

import React, { useMemo, useState } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import { UserContext } from './contexts/UserContext';
import AppRouter from './components/AppRouter';

function App() {
	const [user, setUser] = useState<any>(null);

	const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);

	return (
		<>
		<TopNav/>
		<div className="App">
			<UserContext.Provider value={providerValue}>
			<AppRouter/>
			</UserContext.Provider>
		</div>
		<Footer />
		</>
	);
};

export default App;

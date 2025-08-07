import NavBar from './component/NavBar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main>
			<NavBar />
			{children}
		</main>
	);
};

export default Layout;

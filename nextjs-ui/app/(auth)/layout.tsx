import Image from 'next/image';

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main>
			<div className='flex items-center'>
				<Image
					src='/logo.png'
					width={80}
					height={80}
					alt='Picture of the author'
				/>
			</div>
			{children}
		</main>
	);
};

export default AdminLayout;

'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import './navbar.scss';

const NavBar = () => {
	return (
		<header className='px-5 bg-dark shadow-sm font-work-sans'>
			<nav className='flex justify-between items-center'>
				<div className='logo-container'>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='logo'
							width={80}
							height={80}
						/>
					</Link>
				</div>

				<ul>
					<div className='link-container'>
						<li className='nav-item'>Hotels</li>
						<li className='nav-item'>Things to Do</li>
						<li className='nav-item'>Restaurants</li>
						<li className='nav-item'>Flights</li>
						<li className='nav-item'>Rentals</li>
						<li className='nav-item'>Adventure</li>
					</div>
				</ul>
			</nav>
		</header>
	);
};

export default NavBar;

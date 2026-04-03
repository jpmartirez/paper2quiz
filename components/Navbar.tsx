import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<nav className="flex items-center justify-between gap-8 bg-white/60 border border-white rounded-full px-4 md:px-2 py-2.5 w-full max-w-3xl">
			<Link href="/" className="flex items-center md:pl-3">
				<p className="md:text-xl text-lg font-semibold text-violet-600">
					Paper2Quiz
				</p>
			</Link>
			<div className="w-0.5 h-8 bg-gray-50 hidden md:flex"></div>
			<div
				id="menu"
				className={`max-md:absolute max-md:bg-white/70 max-md:h-196.25 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center justify-center gap-8 z-50 md:gap-10 flex-1 ${mobileOpen ? "max-md:w-full" : "max-md:w-0"}`}
			>
				<a
					href="#"
					onClick={() => setMobileOpen(false)}
					className="text-gray-600 hover:text-gray-700 text-sm"
				>
					Homepage
				</a>
				<a
					href="#"
					onClick={() => setMobileOpen(false)}
					className="text-gray-600 hover:text-gray-700 text-sm"
				>
					About
				</a>
				<a
					href="#"
					onClick={() => setMobileOpen(false)}
					className="text-gray-600 hover:text-gray-700 text-sm"
				>
					Pricing
				</a>

				<a
					href="#"
					onClick={() => setMobileOpen(false)}
					className="text-gray-600 hover:text-gray-700 text-sm"
				>
					Contact Us
				</a>

				<button
					id="close-menu"
					onClick={() => setMobileOpen(false)}
					className="md:hidden bg-violet-500 active:bg-violet-600 text-white p-2 rounded-md aspect-square font-medium transition"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			</div>

			<div className="flex items-center gap-2 md:pr-1">
				<button className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
					Login
				</button>

				<button
					id="open-menu"
					onClick={() => setMobileOpen(true)}
					className="md:hidden text-gray-700 p-2 rounded-md aspect-square font-medium transition"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M4 12h16" />
						<path d="M4 18h16" />
						<path d="M4 6h16" />
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;

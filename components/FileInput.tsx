import Image from "next/image";
import React, { useState } from "react";

export default function Example() {
	const [file, setFile] = useState<File | null>(null);

	// 2. Handle standard click-to-upload
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	// 3. Handle drag-and-drop
	const handleDragOver = (e) => {
		e.preventDefault(); // Prevents the browser from opening the file in a new tab
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	return (
		<div className="flex flex-col gap-5 w-full">
			<label
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				htmlFor="fileInput"
				className="border w-full bg-white rounded-lg text-sm border-indigo-600/60 p-8 flex flex-col items-center gap-4  cursor-pointer hover:border-indigo-500 transition"
			>
				<div className="">
					{file ? (
						<Image src={"/pdf.svg"} alt="pdf-icon" width={45} height={45} />
					) : (
						<svg
							width="44"
							height="44"
							viewBox="0 0 44 44"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.665 3.667H11a3.667 3.667 0 0 0-3.667 3.666v29.334A3.667 3.667 0 0 0 11 40.333h22a3.667 3.667 0 0 0 3.666-3.666v-22m-11-11 11 11m-11-11v11h11m-7.333 9.166H14.665m14.667 7.334H14.665M18.332 16.5h-3.667"
								stroke="#2563EB"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</div>
				<p className="text-gray-500 font-semibold text-center">
					{file ? file.name : "Drag & drop your PDF here"}
				</p>
				{!file && (
					<p className="text-gray-400">
						Or <span className="text-indigo-500 underline">click</span> to
						upload
					</p>
				)}
				<input
					id="fileInput"
					type="file"
					accept="application/pdf"
					className="hidden"
					onChange={handleFileChange}
				/>
			</label>

			{file && (
				<button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
					Generate Exam
				</button>
			)}
		</div>
	);
}

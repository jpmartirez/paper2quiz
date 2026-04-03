import Image from "next/image";
import React, { useState } from "react";

export default function Example() {
	const [file, setFile] = useState<File | null>(null);
	const [isGenerating, setIsGenerating] = useState<boolean>(false);

	// 2. Handle standard click-to-upload
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	// 3. Handle drag-and-drop
	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault(); // Prevents the browser from opening the file in a new tab
	};

	const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	//Function that send the input to the backend
	// Function that sends the input to the backend
	const handleGenerateExam = async () => {
		if (!file) return;

		setIsGenerating(true);

		try {
			console.log("Uploading file and generating exam...");

			// 1. Pack the file into a FormData object
			const formData = new FormData();
			// The string "pdf" here MUST match what your backend expects: formData.get("pdf")
			formData.append("pdf", file);

			// 2. Make the POST request to your Next.js API route
			const response = await fetch("/api/generate", {
				method: "POST",
				body: formData,
				// Note: Do NOT manually set the 'Content-Type' header to 'multipart/form-data'.
				// The browser automatically sets it and adds the correct boundary string when you pass FormData.
			});

			// 3. Check if the server crashed or rejected the request
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`);
			}

			// 4. Parse the JSON returned from the backend
			const data = await response.json();

			// 5. Handle the successful AI generation
			if (data.success) {
				console.log("Exam Data:", data.exam);

				alert("Exam generated successfully!");
			} else {
				throw new Error(data.error || "Failed to generate exam structure.");
			}
		} catch (error) {
			// 6. Provide a more useful error catch
			console.error("Exam generation failed:", error);
			alert(
				"An error occurred while generating the exam. Please check the console.",
			);
		} finally {
			setIsGenerating(false);
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
				<button
					className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
					disabled={isGenerating}
					onClick={handleGenerateExam}
				>
					{isGenerating ? "Analyzing PDF..." : "Generate Exam"}
				</button>
			)}
		</div>
	);
}

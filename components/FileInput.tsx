"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAuth, useClerk } from "@clerk/nextjs";
import ExamPDF, { Question } from "./ExamPDF";

export default function FileInput() {
	const { isSignedIn } = useAuth();
	const { openSignIn } = useClerk();
	const [file, setFile] = useState<File | null>(null);
	const [isGenerating, setIsGenerating] = useState<boolean>(false);

	// NEW STATES: For holding the generated exam and controlling the modal
	const [examData, setExamData] = useState<Question[] | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	// 1. Handle standard click-to-upload
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	// 2. Handle drag-and-drop
	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0] || null;
		if (file && file.type === "application/pdf") {
			setFile(file);
		} else {
			alert("Please upload a valid PDF file.");
		}
	};

	// 3. Send the input to the backend
	const handleGenerateExam = async () => {
		if (!isSignedIn) {
			await openSignIn();
			return;
		}

		if (!file) return;

		setIsGenerating(true);
		setExamData(null); // Reset old data if generating again

		try {
			console.log("Uploading file and generating exam...");

			const formData = new FormData();
			formData.append("pdf", file);

			const response = await fetch("/api/generate", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				console.log("Exam Data:", data.exam);

				// Save the data and trigger the modal!
				setExamData(data.exam);
				setShowModal(true);
			} else {
				throw new Error(data.error || "Failed to generate exam structure.");
			}
		} catch (error) {
			console.error("Exam generation failed:", error);
			alert(
				"An error occurred while generating the exam. Please check the console.",
			);
		} finally {
			setIsGenerating(false);
		}
	};

	// Helper to completely reset the UI
	const handleStartOver = () => {
		setFile(null);
		setExamData(null);
		setShowModal(false);
	};

	return (
		<div className="flex flex-col gap-5 w-full relative">
			<label
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				htmlFor="fileInput"
				className="border w-full bg-white rounded-lg text-sm border-indigo-600/60 p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-indigo-500 transition"
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

			{/* Standard Generate Button (Hides when exam is ready) */}
			{file && !examData && (
				<button
					className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isGenerating}
					onClick={handleGenerateExam}
				>
					{isGenerating ? "Analyzing PDF..." : "Generate Exam"}
				</button>
			)}

			{/* Button to reopen modal if user closed it but didn't start over */}
			{file && examData && !showModal && (
				<div className="flex gap-4 mt-6">
					<button
						onClick={() => setShowModal(true)}
						className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
					>
						View Download Options
					</button>
					<button
						onClick={handleStartOver}
						className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
					>
						Start Over
					</button>
				</div>
			)}

			{/* THE POP-UP MODAL */}
			{showModal && examData && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
					{/* Modal Content Box */}
					<div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative flex flex-col items-center">
						{/* Close (X) Button */}
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>

						{/* Success Icon */}
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</div>

						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Exam Ready!
						</h2>
						<p className="text-gray-500 text-center mb-8">
							Your PDF has been successfully converted into a {examData.length}
							-question multiple choice exam.
						</p>

						{/* PDF Download Link */}
						<PDFDownloadLink
							document={<ExamPDF examData={examData} />}
							fileName={`${file?.name.replace(".pdf", "")}_Exam.pdf`}
							className="w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
						>
							{({ loading }) =>
								loading ? "Formatting Document..." : "Download PDF"
							}
						</PDFDownloadLink>

						{/* Start Over Text Button */}
						<button
							onClick={handleStartOver}
							className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-medium underline underline-offset-2"
						>
							Generate another exam
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

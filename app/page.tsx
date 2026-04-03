"use client";
import FileInput from "@/components/FileInput";
import Navbar from "@/components/Navbar";

const Homepage = () => {
	// Helper function to smooth scroll to the upload box
	const scrollToUpload = () => {
		const uploadSection = document.getElementById("upload-section");
		uploadSection?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<style>
				{`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                `}
			</style>
			<div className="bg-linear-to-b from-[#fcd9ff] to-[#F8F3F9] md:bg-fixed bg-cover bg-no-repeat min-h-screen">
				<section className="flex flex-col items-center bg-linear-to-b from-[#D9D9FF] to-[#F8F3F9] bg-fixed bg-cover bg-no-repeat px-4 py-4">
					<Navbar />

					{/* Social Proof Badge */}
					<div className="flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-15 md:mt-20 rounded-full bg-white/50 border border-white">
						<div className="relative flex size-3.5 items-center justify-center">
							<span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
							<span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
						</div>
						<p className="text-sm text-black/60">
							Join 12,450+ users creating exams faster
						</p>
					</div>

					{/* Hero Text */}
					<h1 className="text-4xl md:text-[66px]/19 text-center max-w-4xl mt-8 text-gray-800 bg-clip-text leading-tight font-medium">
						Turn your PDF lessons into ready-to-use exams.
					</h1>
					<p className="text-sm text-gray-600 text-center max-w-157.5 mt-4">
						Upload a lesson and get a structured multiple choice test you can
						download and use right away.
					</p>

					{/* Action Buttons */}
					<div className="flex gap-3 mt-10">
						<button
							onClick={scrollToUpload}
							className="bg-violet-600 hover:bg-violet-700 text-white text-xs md:text-sm px-6 py-3 rounded-lg transition cursor-pointer"
						>
							Upload PDF
						</button>
						<button className="bg-white hover:bg-white/5 border border-violet-400 text-gray-600 text-xs md:text-sm px-5 py-3 rounded-lg transition cursor-pointer">
							Contact Us
						</button>
					</div>

					{/* Added an ID here so the button above knows where to scroll!
					 */}
					<div
						id="upload-section"
						className="max-w-2xl w-full flex items-center justify-center mt-5 scroll-mt-24"
					>
						<FileInput />
					</div>

					<div className="w-full max-w-200 h-0.75 mt-10 bg-linear-to-r from-white/10 via-violet-600 to-white/10"></div>

					{/* Stats Section */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-18 max-w-232.5 w-full ">
						<div className="text-center">
							<h2 className="font-medium text-2xl md:text-3xl text-gray-800">
								10k+
							</h2>
							<p className="text-xs md:text-sm text-gray-500">PDFs Processed</p>
						</div>
						<div className="text-center">
							<h2 className="font-medium text-2xl md:text-3xl text-gray-800">
								50k+
							</h2>
							<p className="text-xs md:text-sm text-gray-500">
								Questions Generated
							</p>
						</div>
						<div className="text-center">
							<h2 className="font-medium text-2xl md:text-3xl text-gray-800">
								5k+
							</h2>
							<p className="text-xs md:text-sm text-gray-500">Exams Created</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Homepage;

import "dotenv/config";

import { NextResponse } from "next/server";

import PdfParse from "pdf-parse-new";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const client = new GoogleGenAI({});

export async function POST(request: Request) {
	try {
		const formData = await request.formData();

		const file = (formData.get("pdf") as File) || null;

		if (!file)
			return NextResponse.json({ error: "No file provided" }, { status: 400 });

		// 2. Convert the File object into a Node.js Buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// 3. Extract the raw text from the PDF buffer
		const pdfData = await PdfParse(buffer);
		const extractedText = pdfData.text;

		// The dynamic prompt
		const prompt = `
            You are an expert educator and exam creator. I will provide you with text extracted from a lesson document. 
            Your task is to generate a comprehensive multiple-choice exam based strictly on the provided text.

            CRITICAL INSTRUCTIONS:
            1. Analyze the text and automatically determine the appropriate number of questions. Create enough questions to cover all major concepts thoroughly, but do not be repetitive. A short text might yield 3 questions, while a dense text might yield 20.
            2. You must respond ONLY with a valid JSON array. Do not include any markdown formatting (like \`\`\`json), conversational text, or introductory remarks.
            3. Use the following JSON schema for every object in the array:
            [
                {
                    "id": 1,
                    "question": "The text of the question",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "answer" : ["Answer for that question"]
                }
            ]

            Here is the source text to base the exam on:
            """
            ${extractedText}
            """
        `;

		// AI integration
		const interaction = await client.interactions.create({
			model: "gemini-2.5-flash",
			input: prompt,
		});

		const textOutput = interaction.outputs?.find((o) => o.type === "text");

		const text = textOutput?.text;

		// Clean and Parse JSON
		const editedText =
			text
				?.replace(/```json/g, "")
				.replace(/```/g, "")
				.trim() || "";

		const examData = JSON.parse(editedText);

		return NextResponse.json({ success: true, exam: examData });
	} catch (error) {
		console.log("Error Processing Request: ", error);
		return NextResponse.json(
			{
				error: "Failed to process PDF and generate exam",
			},
			{
				status: 500,
			},
		);
	}
}

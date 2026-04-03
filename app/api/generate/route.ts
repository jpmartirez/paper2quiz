import { NextResponse } from "next/server";
import PdfParse from "pdf-parse-new";

export async function POST(request: Request) {
	try {
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

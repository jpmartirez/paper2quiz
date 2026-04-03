import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface Question {
	id: number;
	question: string;
	options: string[];
	answer: string;
}

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: "Helvetica",
		backgroundColor: "#ffffff",
	},
	headerText: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
		color: "#1e1b4b",
	},
	questionBlock: {
		marginBottom: 15,
	},
	questionText: {
		fontSize: 12,
		marginBottom: 6,
		fontWeight: "bold",
		color: "#1f2937",
	},
	optionText: {
		fontSize: 10,
		marginBottom: 4,
		marginLeft: 15,
		color: "#4b5563",
	},
	answerKeyHeader: {
		fontSize: 18,
		marginTop: 30,
		marginBottom: 15,
		paddingBottom: 5,
		borderBottom: "1px solid #e5e7eb",
		color: "#1e1b4b",
		fontWeight: "bold",
	},
	answerText: {
		fontSize: 10,
		marginBottom: 5,
		color: "#1f2937",
	},
});

export default function ExamPDF({ examData }: { examData: Question[] }) {
	return (
		<Document>
			{/* PAGE 1: The Exam Questions */}
			<Page size="A4" style={styles.page}>
				<Text style={styles.headerText}>Generated Exam</Text>

				{examData.map((q) => (
					<View key={q.id} style={styles.questionBlock}>
						{/* The Question */}
						<Text style={styles.questionText}>
							{q.id}. {q.question}
						</Text>

						{/* The Multiple Choice Options */}
						{q.options.map((opt, index) => (
							<Text key={index} style={styles.optionText}>
								{String.fromCharCode(65 + index)}. {opt}
							</Text>
						))}
					</View>
				))}
			</Page>

			{/* PAGE 2: The Answer Key (forces a new page automatically) */}
			<Page size="A4" style={styles.page}>
				<Text style={styles.answerKeyHeader}>Answer Key</Text>
				<View>
					{examData.map((q) => (
						<Text key={q.id} style={styles.answerText}>
							{q.id}. {q.answer}
						</Text>
					))}
				</View>
			</Page>
		</Document>
	);
}

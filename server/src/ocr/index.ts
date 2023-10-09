import { ocrSpace } from "ocr-space-api-wrapper";
import { BadResultException, InternalServerException } from "../util/exceptions";

function convertLocale(locale: string = "en-US") {
	return locale === "en-US" ? "eng" : "por";
}

export async function recognize(locale: string, file: Buffer) {
	const fileString = file.toString('base64');

	const response = await ocrSpace(
		`data:image/webp;${fileString}`,
		{
			apiKey: process.env.OCR_SPACE_API_KEY,
			language: convertLocale(locale),
			detectOrientation: true
		}
	);

	if(response.ErrorMessage) {
		throw new InternalServerException(response.ErrorMessage, response.ErrorDetails);
	}

	if(!response.ParsedResults || response.ParsedResults.length === 0) {
		throw new BadResultException();
	}

	return response.ParsedResults[0].ParsedText;
}

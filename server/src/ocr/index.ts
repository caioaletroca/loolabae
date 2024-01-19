import { ocrSpace } from "ocr-space-api-wrapper";
import { BadResultException, InternalServerException } from "../util/exceptions";
import { config } from "@/lib/config";

function convertLocale(locale: string = "en-US") {
	return locale === "en-US" ? "eng" : "por";
}

export async function recognize(locale: string, file: Buffer) {
	const fileString = file.toString('base64');

	const response = await ocrSpace(
		`data:image/webp;base64,${fileString}`,
		{
			apiKey: await config.get("OCR_SPACE_API_KEY"),
			language: convertLocale(locale),
			detectOrientation: true
		}
	);
	
	if(response.OCRExitCode !== 1) {
		throw new InternalServerException(response.ErrorMessage.toString(), response.ErrorDetails);
	}

	if(!response.ParsedResults || response.ParsedResults.length === 0) {
		throw new BadResultException();
	}

	return response.ParsedResults[0].ParsedText;
}

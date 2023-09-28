import { Request, Response } from 'express';
import { recognize } from './tesseract/worker';
import ApiResponse from './util/response';
import { analyzeContext, fixOCR } from './services/openai';
import { detect } from 'tesseract.js';
import { processImage, rotate, unskew } from './services/opencv';

const threshold = Number(process.env.OPEN_AI_THRESHOLD) || 0.75;

const base = `acidente. Faça-me um favor, abra a gaveta de cima da escrivaninha. Vai encontrar um mapa ali.
Mikae fez o que ele pedia, depois abriu o mapa sobre a mesa baixa. Hedebyön, a linha, era uma massa de terra irregular de cerca de três quilômetros de comprimento e um meio em sua parte mais larga. Um bom trecho da ilha era constituído de floresta. As moradias se concentravam ao redor da ponte do porto de recreio; na outra extremidade da ilha havia uma fazenda, Östergar-
den, de onde o infeliz Aronsson iniciaria seu trajeto de carro.
- Lembre que ela não deixou a ilha - sublinhou Henrik Vanger. - Aqui em Hedebyön pode-se morrer num acidente como qualquer outro lugar do mundo. A pessoa ser atingida por um raio, embora naquele dia não tives-
-se desabado nenhuma tempestade. Pode ser pisoteada por um cavalo, cair num poço ou numa furna. Certamente há inúmeras maneiras de se sofrer um acidente aqui. Refleti sobre tudo isso.
Ele ergueu um terceiro dedo.
- Resta um problema, equivale também à terceira possibilidade: que, contra todas as expectativas, ela tenha se suicidado. Mas então o corpo teria si-
-do encontrado em alguma parte desta área tão limitada.
Henrik Vanger espalmou a mão no meio do mapa.`;

export default async function postAnalyze(req: Request, res: Response) {
	if(!req.file) {
		return ApiResponse(res).BadRequestException("Invalid image");
	}
	
	const processedImage = await processImage(req.file.buffer);

	const { data: { orientation_degrees, orientation_confidence } } = await detect(processedImage);

	let rotatedImage = processedImage;
	if(orientation_confidence > 10) {
		rotatedImage = await rotate(processedImage, orientation_degrees);
	}

	const unskewedImage = await unskew(rotatedImage);
	
	const { data: { text } } = await recognize(req.body.locale, unskewedImage);
	
	const fixedText = await fixOCR(req.body.locale, text);

	if(fixedText.includes("Erro")) {
		return ApiResponse(res).BadResultException();
	}

	const contexts = await analyzeContext(fixedText);
	
	const filteredContexts = contexts.filter(context => context.value >= threshold);
	
	return ApiResponse(res).send({
		text: fixedText,
		context: filteredContexts
	});
}

import fs from "node:fs/promises";
import path from "node:path";

export async function saveFile(file: Buffer, filePath: string) {
	
	await fs.mkdir(path.parse(filePath).dir, { recursive: true });
	await fs.writeFile(filePath, file);
}

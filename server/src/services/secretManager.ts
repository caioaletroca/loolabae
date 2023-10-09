import { InternalServerException } from "@/util/exceptions";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export const client = new SecretManagerServiceClient();

export async function getSecret(name: string) {
	if(!process.env.PROJECT_NAME) {
		throw new InternalServerException(`Secret Manager: PROJECT_NAME environment variable is undefined.`);
	}

	const real_name = `projects/${process.env.PROJECT_NAME}/secrets/${name}/versions/latest`;
	const [secret] = await client.accessSecretVersion({ name: real_name });

	if(!secret.payload?.data) {
		throw new InternalServerException(`Secret Manager: ${name} secret is empty or undefined.`);
	}
	
	return Buffer.from(secret.payload.data).toString();
}

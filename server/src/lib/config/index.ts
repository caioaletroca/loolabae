import { getSecret } from '@/services/secretManager';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export const config = {
	secretManager: new SecretManagerServiceClient(),
	cache: {} as Record<string, string | undefined>,

	async get(name: string): Promise<string | undefined> {
		// Check if property is already in cache
		if(name in this.cache) {
			return this.cache[name];
		}

		// Check if property is defined in Node Envs
		if(name in process.env) {
			this.cache[name] = process.env[name];
			return this.cache[name];
		}

		// If all fails, fetch secret manager only in production
		if (process.env.NODE_ENV === "production") {
			const value = await getSecret(name);
			this.cache[name] = value;
			return this.cache[name];
		}

		return undefined;
	}
}

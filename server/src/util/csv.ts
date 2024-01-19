import fs from "node:fs/promises";

export type CSV<T> = {
	columns: string[];
	rows: T[];
	delimiter: string;
	setColumns: (cols: string[]) => void;
	push: (data: T) => void;
	toFile: (filePath: string) => Promise<void>;
	toString: () => string;
}

export function csv<T extends object>(): CSV<T> {
	return {
		columns: [],
		rows: [],
		delimiter: ',',

		setColumns(cols: string[]) {
			this.columns = cols;
		},

		push(data: T) {
			this.rows.push(data);
		},

		async toFile(filePath: string) {
			const text = this.toString();
			return await fs.writeFile(filePath, text, { flag: 'w+' });
		},

		toString() {
			const header = this.columns.join(this.delimiter) + '\n';
			const content = this.rows.map(row => {
				if(this.columns.length > 0) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					return this.columns.map(col => (row as any)[col]).join(this.delimiter)
				}

				return Object.values(row).join(this.delimiter);
			}).join('\n');

			return `${header}${content}`;
		}
	};
}

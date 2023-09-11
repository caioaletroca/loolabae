/* eslint-disable no-undef */
// import path from 'path';

// const buildEslintCommand = (filenames) =>
// 	`eslint --file ${filenames
// 		.map((f) => path.relative(process.cwd(), f))
// 		.join(' --file ')}`;

// const stage = (filenames) =>
// 	`git add ${filenames.map((f) => path.relative(process.cwd(), f)).join('')}`;

export default {
	'*.{js,jsx,ts,tsx}': ["eslint --fix --file"],
};

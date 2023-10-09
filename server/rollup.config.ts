import fs from 'fs';
import run from "@rollup/plugin-run";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());
const dependencies = Object.keys(pkg.dependencies).filter(key => key !== "core");

const dev = process.env.NODE_ENV !== "production";

const config = {
	input: "./src/server.ts",
	output: {
		dir: 'dist',
		format: 'cjs'
	},
	plugins:[
		dev && run({
			execArgv: ["-r", "dotenv/config"],
		}),
		commonjs(),
		nodeResolve({
			preferBuiltins: true,
		}),
		json(),
		typescript()
	],
	external: dependencies
}

export default config;

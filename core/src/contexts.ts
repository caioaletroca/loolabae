const contexts = [
	{
		name: "church",
		type: "after"
	},
	{
		name: "rain",
		type: "during"
	},
]

export type ContextType = "during" | 'after';

export type Context = typeof contexts extends readonly (infer ElementType)[]
	? ElementType
	: never;

export type ContextWeighted = Context & {
	value: number
}

export default contexts;

const contexts = [
	// Background
	{
		name: "church",
		type: "after"
	},
	{
		name: "rain",
		type: "during"
	},
	{
		name: "mall",
		type: "during"
	},
	{
		name: "restaurant",
		type: "during"
	},
	{
		name: "cooking",
		type: "during"
	},

	// Effects
	{
		name: "cat",
		type: "after"
	},
	// {
	// 	name: "dog",
	// 	type: "after"
	// },
	{
		name: "cow",
		type: "after"
	},
	{
		name: "horse",
		type: "after"
	},
	{
		name: "pig",
		type: "after"
	},
	{
		name: "lion",
		type: "after"
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

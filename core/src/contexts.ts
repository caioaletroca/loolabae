const contexts = [
	// Background
	{
		name: "rain",
		type: "during"
	},
	{
		name: "mall",
		type: "during"
	},
	{
		name: "apartment",
		type: "during"
	},
	{
		name: "restaurant",
		type: "during"
	},
	{
		name: "city square",
		type: "during"
	},
	{
		name: "school",
		type: "during"
	},
	{
		name: "cooking",
		type: "during"
	},
	{
		name: "forest",
		type: "during"
	},
	{
		name: "savannah",
		type: "during"
	},

	// Effects Animals
	{
		name: "cat",
		type: "after"
	},
	{
		name: "dog",
		type: "after"
	},
	{
		name: "chicken",
		type: "after"
	},
	{
		name: "duck",
		type: "after"
	},
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
		name: "toad",
		type: "after"
	},
	{
		name: "lion",
		type: "after"
	},

	// Effects Misc
	{
		name: "school break",
		type: "after"
	},
	{
		name: "church bell",
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

export { contexts };

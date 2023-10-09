import { contexts } from "./contexts";

export function getFilteredContexts(names: string[]) {
	return contexts.filter(c => names.includes(c.name));
}

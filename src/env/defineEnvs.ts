type VariableName = `VITE_${string}`;

type Definition = VariableName | { name: VariableName; fallback: string } | { name: VariableName; optionalForDevelopment: true };

type Envs<T extends Record<string, Definition>> = {
	readonly [K in keyof T]: T[K] extends { optionalForDevelopment: true } ? string | undefined : string;
};

interface Env {
	DEV: boolean;
	[name: string]: unknown;
}

interface Variable {
	name: VariableName;
	fallback?: string;
	optionalForDevelopment?: true;
}

function toVariable(definition: Definition): Variable {
	return typeof definition === 'string' ? { name: definition } : definition;
}

function readValue(env: Env, { name, fallback }: Variable): string | undefined {
	const value = env[name];
	const trimmed = typeof value === 'string' ? value.trim() : '';

	return trimmed || fallback;
}

export function defineEnvs<const T extends Record<string, Definition>>(env: Env, definitions: T): Envs<T> {
	const missing: VariableName[] = [];

	const entries = Object.entries(definitions).map(([key, definition]) => {
		const variable = toVariable(definition);
		const value = readValue(env, variable);

		if (!value && !(variable.optionalForDevelopment && env.DEV))
			missing.push(variable.name);

		return [key, value];
	});

	if (missing.length)
		throw new TypeError(`Environment variables are required: ${missing.join(', ')}`);

	return Object.fromEntries(entries) as Envs<T>;
}

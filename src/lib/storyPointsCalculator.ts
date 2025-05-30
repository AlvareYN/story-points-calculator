export interface TimeOption {
	label: string;
	value: number;
	description: string;
	requiresCustomInput?: boolean;
}

export interface ComplexityOption {
	label: string;
	value: number;
	multiplier: number;
	color: 'green' | 'yellow' | 'red';
}

export interface DefinitionOption {
	label: string;
	value: number;
	multiplier: number;
	color: 'green' | 'yellow' | 'red';
}

export const timeOptions: TimeOption[] = [
	{ label: '< 0.5 días', value: 0.5, description: 'Menos de medio día' },
	{ label: '0.5 – 1 días', value: 1, description: 'Entre medio día y un día' },
	{ label: '1 – 2 días', value: 2, description: 'Entre uno y dos días' },
	{ label: '2 – 3 días', value: 3, description: 'Entre dos y tres días' },
	{ label: '> 3 días', value: -1, description: 'Más de tres días', requiresCustomInput: true }
];

export const complexityOptions: ComplexityOption[] = [
	{ label: 'Baja', value: 1, multiplier: 1.0, color: 'green' },
	{ label: 'Media', value: 2, multiplier: 1.5, color: 'yellow' },
	{ label: 'Alta', value: 3, multiplier: 2.0, color: 'red' }
];

export const definitionOptions: DefinitionOption[] = [
	{ label: 'Clara', value: 1, multiplier: 1.0, color: 'green' },
	{ label: 'Ambigua', value: 2, multiplier: 1.25, color: 'yellow' },
	{ label: 'Incierta', value: 3, multiplier: 1.5, color: 'red' }
];

export interface StoryPointsCalculation {
	time: number;
	complexity: number;
	definition: number;
	result: number;
	rounded: number;
}

export function calculateStoryPoints(
	timeValue: number,
	complexityMultiplier: number,
	definitionMultiplier: number
): StoryPointsCalculation {
	const result = timeValue * complexityMultiplier * definitionMultiplier;
	const rounded = Math.round(result * 2) / 2; // Redondeo a 0.5

	return {
		time: timeValue,
		complexity: complexityMultiplier,
		definition: definitionMultiplier,
		result,
		rounded
	};
}

export function validateInputs(
	timeSelected: boolean,
	complexitySelected: boolean,
	definitionSelected: boolean,
	customTimeValue?: number | null,
	requiresCustomTime?: boolean
): { isValid: boolean; errors: string[] } {
	const errors: string[] = [];

	if (!timeSelected) {
		errors.push('Debe seleccionar un tiempo estimado');
	} else if (requiresCustomTime) {
		if (!customTimeValue || customTimeValue <= 0) {
			errors.push('Debe especificar un tiempo válido mayor a 0 días');
		} else if (customTimeValue <= 3) {
			errors.push('Para tiempos de 3 días o menos, use las opciones predefinidas');
		}
	}

	if (!complexitySelected) errors.push('Debe seleccionar un nivel de complejidad');
	if (!definitionSelected) errors.push('Debe seleccionar un nivel de definición');

	return {
		isValid: errors.length === 0,
		errors
	};
}

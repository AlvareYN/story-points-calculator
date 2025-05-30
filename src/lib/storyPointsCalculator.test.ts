import { describe, it, expect } from 'vitest';
import {
	calculateStoryPoints,
	validateInputs,
	timeOptions,
	complexityOptions,
	definitionOptions
} from '../lib/storyPointsCalculator.js';

describe('Story Points Calculator', () => {
	describe('calculateStoryPoints', () => {
		it('should calculate story points correctly with basic values', () => {
			const result = calculateStoryPoints(2, 1.5, 1.25);

			expect(result.time).toBe(2);
			expect(result.complexity).toBe(1.5);
			expect(result.definition).toBe(1.25);
			expect(result.result).toBe(3.75);
			expect(result.rounded).toBe(4); // Redondeado a 0.5 más cercano
		});

		it('should handle the example from requirements (2 × 2.0 × 1.25 = 5.0)', () => {
			const result = calculateStoryPoints(2, 2.0, 1.25);

			expect(result.result).toBe(5.0);
			expect(result.rounded).toBe(5.0);
		});

		it('should round to nearest 0.5', () => {
			// Test various rounding scenarios
			expect(calculateStoryPoints(1, 1.0, 1.1).rounded).toBe(1); // 1.1 → 1
			expect(calculateStoryPoints(1, 1.0, 1.3).rounded).toBe(1.5); // 1.3 → 1.5
			expect(calculateStoryPoints(1, 1.0, 1.7).rounded).toBe(1.5); // 1.7 → 1.5
			expect(calculateStoryPoints(1, 1.0, 1.8).rounded).toBe(2); // 1.8 → 2
		});

		it('should handle minimum values', () => {
			const result = calculateStoryPoints(0.5, 1.0, 1.0);

			expect(result.result).toBe(0.5);
			expect(result.rounded).toBe(0.5);
		});

		it('should handle maximum values', () => {
			const result = calculateStoryPoints(5, 2.0, 1.5);

			expect(result.result).toBe(15);
			expect(result.rounded).toBe(15);
		});
	});

	describe('validateInputs', () => {
		it('should return valid when all inputs are selected', () => {
			const result = validateInputs(true, true, true);

			expect(result.isValid).toBe(true);
			expect(result.errors).toHaveLength(0);
		});

		it('should return invalid when no inputs are selected', () => {
			const result = validateInputs(false, false, false);

			expect(result.isValid).toBe(false);
			expect(result.errors).toHaveLength(3);
			expect(result.errors).toContain('Debe seleccionar un tiempo estimado');
			expect(result.errors).toContain('Debe seleccionar un nivel de complejidad');
			expect(result.errors).toContain('Debe seleccionar un nivel de definición');
		});

		it('should return specific errors for missing inputs', () => {
			const result = validateInputs(true, false, true);

			expect(result.isValid).toBe(false);
			expect(result.errors).toHaveLength(1);
			expect(result.errors).toContain('Debe seleccionar un nivel de complejidad');
		});
	});

	describe('Data Consistency', () => {
		it('should have correct time options', () => {
			expect(timeOptions).toHaveLength(5);
			expect(timeOptions[0].value).toBe(0.5);
			expect(timeOptions[4].value).toBe(-1); // Changed to -1 for custom input
		});

		it('should have correct complexity options with multipliers', () => {
			expect(complexityOptions).toHaveLength(3);
			expect(complexityOptions[0].multiplier).toBe(1.0);
			expect(complexityOptions[1].multiplier).toBe(1.5);
			expect(complexityOptions[2].multiplier).toBe(2.0);
		});

		it('should have correct definition options with multipliers', () => {
			expect(definitionOptions).toHaveLength(3);
			expect(definitionOptions[0].multiplier).toBe(1.0);
			expect(definitionOptions[1].multiplier).toBe(1.25);
			expect(definitionOptions[2].multiplier).toBe(1.5);
		});

		it('should have color indicators for complexity levels', () => {
			expect(complexityOptions[0].color).toBe('green');
			expect(complexityOptions[1].color).toBe('yellow');
			expect(complexityOptions[2].color).toBe('red');
		});

		it('should have color indicators for definition levels', () => {
			expect(definitionOptions[0].color).toBe('green');
			expect(definitionOptions[1].color).toBe('yellow');
			expect(definitionOptions[2].color).toBe('red');
		});

		it('should validate custom time input when required', () => {
			// Test with valid custom time
			const validResult = validateInputs(true, true, true, 5, true);
			expect(validResult.isValid).toBe(true);
			expect(validResult.errors).toHaveLength(0);

			// Test with invalid custom time (too low)
			const invalidResult = validateInputs(true, true, true, 2, true);
			expect(invalidResult.isValid).toBe(false);
			expect(invalidResult.errors).toContain(
				'Para tiempos de 3 días o menos, use las opciones predefinidas'
			);

			// Test with missing custom time when required
			const missingResult = validateInputs(true, true, true, null, true);
			expect(missingResult.isValid).toBe(false);
			expect(missingResult.errors).toContain('Debe especificar un tiempo válido mayor a 0 días');
		});
	});
});

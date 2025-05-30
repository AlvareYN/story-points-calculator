<script lang="ts">
	import type { StoryPointsCalculation } from '../storyPointsCalculator.js';

	interface Props {
		calculation: StoryPointsCalculation | null;
		showFractional: boolean;
	}

	let { calculation, showFractional }: Props = $props();

	function getResultColorClass(result: number) {
		if (result <= 2) return 'text-green-600 dark:text-green-400';
		if (result <= 5) return 'text-yellow-600 dark:text-yellow-400';
		return 'text-red-600 dark:text-red-400';
	}

	function getResultBgClass(result: number) {
		if (result <= 2)
			return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
		if (result <= 5)
			return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
		return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
	}
</script>

{#if calculation}
	<div class="space-y-6">
		<!-- Fórmula -->
		<div
			class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800"
		>
			<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Cálculo</h3>

			<div class="space-y-3">
				<div class="flex items-center justify-between text-sm">
					<span class="text-gray-600 dark:text-gray-400">Tiempo:</span>
					<span class="font-mono font-medium">{calculation.time}</span>
				</div>

				<div class="flex items-center justify-between text-sm">
					<span class="text-gray-600 dark:text-gray-400">Complejidad:</span>
					<span class="font-mono font-medium">×{calculation.complexity}</span>
				</div>

				<div class="flex items-center justify-between text-sm">
					<span class="text-gray-600 dark:text-gray-400">Definición:</span>
					<span class="font-mono font-medium">×{calculation.definition}</span>
				</div>

				<hr class="border-gray-300 dark:border-gray-600" />

				<div class="text-center">
					<div class="font-mono text-lg text-gray-700 dark:text-gray-300">
						{calculation.time} × {calculation.complexity} × {calculation.definition} = {calculation.result.toFixed(
							2
						)}
					</div>
				</div>
			</div>
		</div>

		<!-- Resultado -->
		<div
			class={`rounded-lg border-2 p-6 ${getResultBgClass(showFractional ? calculation.result : calculation.rounded)}`}
		>
			<div class="text-center">
				<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Story Points</h3>

				<div
					class={`text-5xl font-bold ${getResultColorClass(showFractional ? calculation.result : calculation.rounded)}`}
				>
					{showFractional ? calculation.result.toFixed(2) : calculation.rounded}
				</div>

				{#if !showFractional && calculation.result !== calculation.rounded}
					<div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Valor exacto: {calculation.result.toFixed(2)}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

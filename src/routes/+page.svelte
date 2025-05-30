<script lang="ts">
	import SelectionCard from '$lib/components/SelectionCard.svelte';
	import ResultDisplay from '$lib/components/ResultDisplay.svelte';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import {
		timeOptions,
		complexityOptions,
		definitionOptions,
		calculateStoryPoints,
		validateInputs,
		type StoryPointsCalculation
	} from '$lib/storyPointsCalculator.js';

	let selectedTime: number | null = $state(null);
	let selectedComplexity: number | null = $state(null);
	let selectedDefinition: number | null = $state(null);
	let customTimeValue: number | null = $state(null);
	let showFractional = $state(false);
	let calculation: StoryPointsCalculation | null = $state(null);
	let errors: string[] = $state([]);

	function handleTimeSelect(value: number) {
		selectedTime = value;
		updateCalculation();
	}

	function handleCustomTimeChange(value: number | null) {
		customTimeValue = value;
		updateCalculation();
	}

	function handleComplexitySelect(value: number) {
		selectedComplexity = value;
		updateCalculation();
	}

	function handleDefinitionSelect(value: number) {
		selectedDefinition = value;
		updateCalculation();
	}

	function updateCalculation() {
		// Determinar el valor real del tiempo
		const actualTimeValue = selectedTime === -1 ? customTimeValue : selectedTime;
		const requiresCustomTime = selectedTime === -1;

		const validation = validateInputs(
			selectedTime !== null,
			selectedComplexity !== null,
			selectedDefinition !== null,
			customTimeValue,
			requiresCustomTime
		);

		errors = validation.errors;

		if (validation.isValid && actualTimeValue && selectedComplexity && selectedDefinition) {
			const complexityOption = complexityOptions.find((c) => c.value === selectedComplexity);
			const definitionOption = definitionOptions.find((d) => d.value === selectedDefinition);

			if (complexityOption && definitionOption) {
				calculation = calculateStoryPoints(
					actualTimeValue,
					complexityOption.multiplier,
					definitionOption.multiplier
				);
			}
		} else {
			calculation = null;
		}
	}

	function resetCalculation() {
		selectedTime = null;
		selectedComplexity = null;
		selectedDefinition = null;
		customTimeValue = null;
		calculation = null;
		errors = [];
	}
</script>

<div class="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="text-2xl">📊</div>
					<h1 class="text-xl font-bold text-gray-900 dark:text-white">
						Calculadora de Story Points
					</h1>
				</div>
				<DarkModeToggle />
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-8">
			<!-- Descripción -->
			<div class="text-center">
				<p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
					Calcula automáticamente los Story Points utilizando la fórmula:
					<span class="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-700">
						Tiempo × Complejidad × Definición
					</span>
				</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Panel de Selección -->
				<div class="space-y-8 lg:col-span-2">
					<!-- Tiempo -->
					<SelectionCard
						title="⏱️ Tiempo Estimado"
						options={timeOptions}
						bind:selected={selectedTime}
						onSelect={handleTimeSelect}
						bind:customValue={customTimeValue}
						onCustomValueChange={handleCustomTimeChange}
						showCustomInput={selectedTime === -1}
					/>

					<!-- Complejidad -->
					<SelectionCard
						title="🧩 Complejidad"
						options={complexityOptions}
						bind:selected={selectedComplexity}
						onSelect={handleComplexitySelect}
						showMultiplier={true}
					/>

					<!-- Definición -->
					<SelectionCard
						title="📋 Definición"
						options={definitionOptions}
						bind:selected={selectedDefinition}
						onSelect={handleDefinitionSelect}
						showMultiplier={true}
					/>

					<!-- Controles -->
					<div
						class="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="flex items-center space-x-3">
							<label class="flex cursor-pointer items-center space-x-2">
								<input
									type="checkbox"
									bind:checked={showFractional}
									class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
								/>
								<span class="text-sm text-gray-700 dark:text-gray-300">
									Mostrar valores fraccionarios
								</span>
							</label>
						</div>

						<button
							onclick={resetCalculation}
							class="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							<span>Nuevo Cálculo</span>
						</button>
					</div>
				</div>

				<!-- Panel de Resultado -->
				<div class="lg:col-span-1">
					<!-- Errores -->
					{#if errors.length > 0}
						<div
							class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
						>
							<h3 class="mb-2 text-sm font-medium text-red-800 dark:text-red-200">
								Campos requeridos:
							</h3>
							<ul class="space-y-1 text-sm text-red-700 dark:text-red-300">
								{#each errors as error (error)}
									<li>• {error}</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Resultado -->
					<ResultDisplay {calculation} {showFractional} />
				</div>
			</div>

			<!-- Footer con información -->
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
			>
				<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
					💡 Ejemplo de Cálculo
				</h3>
				<div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
					<div>• <strong>Tiempo:</strong> 2 días → 2</div>
					<div>• <strong>Complejidad:</strong> Alta → ×2.0</div>
					<div>• <strong>Definición:</strong> Ambigua → ×1.25</div>
					<div class="mt-2 rounded bg-gray-100 p-2 font-mono dark:bg-gray-700">
						<strong>Resultado:</strong> 2 × 2.0 × 1.25 = 5.0 Story Points
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

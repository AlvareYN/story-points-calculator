<script lang="ts">
	interface Props {
		options: Array<{
			label: string;
			value: number;
			multiplier?: number;
			description?: string;
			color?: 'green' | 'yellow' | 'red';
			requiresCustomInput?: boolean;
		}>;
		selected: number | null;
		title: string;
		onSelect: (value: number) => void;
		showMultiplier?: boolean;
		customValue?: number | null;
		onCustomValueChange?: (value: number | null) => void;
		showCustomInput?: boolean;
	}

	let {
		options,
		selected = $bindable(),
		title,
		onSelect,
		showMultiplier = false,
		customValue = $bindable(),
		onCustomValueChange,
		showCustomInput = false
	}: Props = $props();

	function getColorClasses(color?: 'green' | 'yellow' | 'red', isSelected?: boolean) {
		const baseClasses = 'border-2 transition-all duration-200 cursor-pointer hover:shadow-md';

		if (isSelected) {
			switch (color) {
				case 'green':
					return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-900/20`;
				case 'yellow':
					return `${baseClasses} border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`;
				case 'red':
					return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/20`;
				default:
					return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/20`;
			}
		}

		return `${baseClasses} border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800`;
	}

	function getIndicatorClasses(color?: 'green' | 'yellow' | 'red') {
		switch (color) {
			case 'green':
				return 'text-green-600 dark:text-green-400';
			case 'yellow':
				return 'text-yellow-600 dark:text-yellow-400';
			case 'red':
				return 'text-red-600 dark:text-red-400';
			default:
				return 'text-gray-600 dark:text-gray-400';
		}
	}

	function getIndicatorEmoji(color?: 'green' | 'yellow' | 'red') {
		switch (color) {
			case 'green':
				return '🟢';
			case 'yellow':
				return '🟡';
			case 'red':
				return '🔴';
			default:
				return '⚪';
		}
	}

	function handleCustomValueInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = parseFloat(target.value);
		if (onCustomValueChange) {
			onCustomValueChange(isNaN(value) ? null : value);
		}
	}

	function handleOptionSelect(value: number) {
		onSelect(value);
		// Si se selecciona una opción que no requiere input personalizado, limpiar el valor
		const option = options.find((opt) => opt.value === value);
		if (!option?.requiresCustomInput && onCustomValueChange) {
			onCustomValueChange(null);
		}
	}
</script>

<div class="space-y-3">
	<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each options as option (option.value)}
			<div
				class={getColorClasses(option.color, selected === option.value)}
				onclick={() => handleOptionSelect(option.value)}
				role="button"
				tabindex="0"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						handleOptionSelect(option.value);
					}
				}}
			>
				<div class="p-4">
					<div class="mb-2 flex items-center justify-between">
						<span class="font-medium text-gray-900 dark:text-white">
							{option.label}
						</span>
						{#if option.color}
							<span class={getIndicatorClasses(option.color)}>
								{getIndicatorEmoji(option.color)}
							</span>
						{/if}
					</div>

					{#if option.description}
						<p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
							{option.description}
						</p>
					{/if}

					{#if showMultiplier && option.multiplier}
						<div class="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-700">
							×{option.multiplier}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Input personalizado para tiempo > 3 días -->
	{#if showCustomInput && selected === -1}
		<div
			class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
		>
			<label
				for="custom-time-input"
				class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				Especifique el número de días:
			</label>
			<div class="flex items-center space-x-2">
				<input
					id="custom-time-input"
					type="number"
					min="3.1"
					step="0.5"
					placeholder="ej: 5"
					value={customValue || ''}
					oninput={handleCustomValueInput}
					class="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				/>
				<span class="text-sm text-gray-500 dark:text-gray-400">días</span>
			</div>
			<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
				Ingrese un valor mayor a 3 días (ej: 3.5, 5, 7, 10)
			</p>
		</div>
	{/if}
</div>

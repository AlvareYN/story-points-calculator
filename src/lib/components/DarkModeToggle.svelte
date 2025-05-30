<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let isDark = $state(false);

	// Función para aplicar el tema
	function applyTheme(dark: boolean) {
		if (browser) {
			const html = document.documentElement;
			if (dark) {
				html.classList.add('dark');
				html.style.colorScheme = 'dark';
			} else {
				html.classList.remove('dark');
				html.style.colorScheme = 'light';
			}
			localStorage.setItem('darkMode', dark.toString());
		}
	}

	onMount(() => {
		// Leer el estado inicial del DOM
		isDark = document.documentElement.classList.contains('dark');

		// Sincronizar con localStorage si no está ya aplicado
		const stored = localStorage.getItem('darkMode');
		if (stored) {
			const shouldBeDark = stored === 'true';
			if (shouldBeDark !== isDark) {
				isDark = shouldBeDark;
				applyTheme(isDark);
			}
		}

		// Escuchar cambios en la preferencia del sistema
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			// Solo cambiar automáticamente si no hay preferencia guardada
			if (!localStorage.getItem('darkMode')) {
				isDark = e.matches;
				applyTheme(isDark);
			}
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	function toggleDarkMode() {
		isDark = !isDark;
		applyTheme(isDark);
	}
</script>

<button
	onclick={toggleDarkMode}
	class="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
	aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
>
	{#if isDark}
		<svg class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
			<path
				fill-rule="evenodd"
				d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else}
		<svg class="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
	{/if}
</button>

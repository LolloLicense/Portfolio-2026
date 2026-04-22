const THEME_STORAGE_KEY = "theme-toggle";

export function initThemeToggle(): void {
	const themeToggle = document.querySelector<HTMLButtonElement>("#themeToggle");

	if (themeToggle === null) {
		return;
	}

	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	if (savedTheme === "light" || savedTheme === "dark") {
		document.documentElement.dataset.theme = savedTheme;
		updateThemeButton(themeToggle, savedTheme);
	} else {
		document.documentElement.dataset.theme = "light";
		updateThemeButton(themeToggle, "light");
	}

	themeToggle.addEventListener("click", function handleThemeToggle(): void {
		const currentTheme =
			document.documentElement.dataset.theme === "dark" ? "dark" : "light";

		const nextTheme = currentTheme === "dark" ? "light" : "dark";

		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
		updateThemeButton(themeToggle, nextTheme);
	});
}

function updateThemeButton(
	button: HTMLButtonElement,
	theme: "light" | "dark",
): void {
	if (theme === "dark") {
		button.setAttribute("aria-label", "Byt till ljust tema");
		button.setAttribute("aria-pressed", "true");
		return;
	}

	button.setAttribute("aria-label", "Byt till mörkt tema");
	button.setAttribute("aria-pressed", "false");
}

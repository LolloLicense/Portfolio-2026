let spotlightTimeout: number | null = null;

export function initContactSpotlight(): void {
	// Finds the "Kontakt" link in the header menu
	const contactMenuLink = document.querySelector(
		"#contactMenuLink",
	) as HTMLAnchorElement | null;

	const socialSidebar = document.querySelector(
		"#socialSidebar",
	) as HTMLElement | null;

	if (!contactMenuLink || !socialSidebar) {
		return;
	}

	contactMenuLink.addEventListener("click", (event: MouseEvent) => {
		event.preventDefault();

		socialSidebar.classList.remove("is-spotlighted");
		void socialSidebar.offsetWidth;
		socialSidebar.classList.add("is-spotlighted");

		if (spotlightTimeout) {
			window.clearTimeout(spotlightTimeout);
		}

		spotlightTimeout = window.setTimeout(() => {
			socialSidebar.classList.remove("is-spotlighted");
		}, 2000);
	});
}

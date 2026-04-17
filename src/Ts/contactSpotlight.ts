/**
 * contactSpotlight.ts
 *
 * This helper handles the spotlight effect for the contact sidebar.
 *
 * When the user clicks the "Kontakt" link in the header:
 * - default anchor jump is prevented
 * - the page scrolls smoothly to the social sidebar
 * - the sidebar gets a temporary spotlight class
 * - the class is removed again after 5 seconds
 *
 * This keeps the feature isolated and easier to maintain.
 */

let spotlightTimeout: number | null = null;

/**
 * Sets up the spotlight interaction for the contact menu link.
 */
export function initContactSpotlight(): void {
	// Finds the "Kontakt" link in the header menu
	const contactMenuLink = document.querySelector(
		"#contactMenuLink",
	) as HTMLAnchorElement | null;

	// Finds the sidebar that contains the contact links
	const socialSidebar = document.querySelector(
		"#socialSidebar",
	) as HTMLElement | null;

	// Stops here if one of the elements does not exist
	if (!contactMenuLink || !socialSidebar) {
		return;
	}

	contactMenuLink.addEventListener("click", () => {
		socialSidebar.classList.remove("is-spotlighted");
		// Forces a reflow so the browser resets the animation state
		void socialSidebar.offsetWidth;
		socialSidebar.classList.add("is-spotlighted");

		// Clears the old timeout if the user clicks again before 5 seconds have passed
		if (spotlightTimeout) {
			window.clearTimeout(spotlightTimeout);
		}
		spotlightTimeout = window.setTimeout(() => {
			socialSidebar.classList.remove("is-spotlighted");
		}, 2000);
	});
}

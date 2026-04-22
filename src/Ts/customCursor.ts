export function initCustomCursor(): void {
	const cursor = document.querySelector(
		".customCursor",
	) as HTMLDivElement | null;

	if (cursor === null) {
		return;
	}

	window.addEventListener("mousemove", (event: MouseEvent) => {
		cursor.style.left = `${event.clientX}px`;
		cursor.style.top = `${event.clientY}px`;
	});

	const interactiveSelector =
		"a, button, input, textarea, select, [role='button'], .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .bingoCell, .playAgainBtn, .contactBtn";

	document.addEventListener("mouseover", (event: MouseEvent) => {
		const target = event.target as HTMLElement | null;

		if (target?.closest(interactiveSelector)) {
			cursor.classList.add("isHovering");
		}
	});

	document.addEventListener("mouseout", (event: MouseEvent) => {
		const target = event.target as HTMLElement | null;

		if (target?.closest(interactiveSelector)) {
			cursor.classList.remove("isHovering");
		}
	});
}

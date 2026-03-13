/**
 * cvDialog.ts
 *
 * Hanterar öppning och stängning av CV-dialogen.
 * Använder HTMLDialogElement för att visa CV:t som en modal.
 */

export function initCvDialog(): void {
	// Hämtar öppna-knappen i hero-sektionen
	const openCvBtn = document.querySelector<HTMLButtonElement>("#openCvBtn");

	// Hämtar stäng-knappen inne i dialogen
	const closeCvBtn = document.querySelector<HTMLButtonElement>("#closeCvBtn");

	// Hämtar själva dialog-elementet
	const cvDialog = document.querySelector<HTMLDialogElement>("#cvDialog");

	// Om något av elementen saknas ska funktionen avbrytas tryggt
	if (!openCvBtn || !closeCvBtn || !cvDialog) {
		return;
	}

	// När användaren klickar på öppna-knappen visas dialogen
	openCvBtn.addEventListener("click", function handleOpenCvDialog(): void {
		cvDialog.showModal();
	});

	// När användaren klickar på stäng-knappen stängs dialogen
	closeCvBtn.addEventListener("click", function handleCloseCvDialog(): void {
		cvDialog.close();
	});
}

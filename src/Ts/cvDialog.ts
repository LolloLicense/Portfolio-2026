export function initCvDialog(): void {
	const openCvBtn = document.querySelector<HTMLButtonElement>("#openCvBtn");
	const closeCvBtn = document.querySelector<HTMLButtonElement>("#closeCvBtn");
	const cvDialog = document.querySelector<HTMLDialogElement>("#cvDialog");
	const customCursor = document.querySelector<HTMLDivElement>(".customCursor");

	if (!openCvBtn || !closeCvBtn || !cvDialog || customCursor === null) {
		return;
	}

	const originalCursorParent = customCursor.parentElement;

	openCvBtn.addEventListener("click", function handleOpenCvDialog(): void {
		cvDialog.showModal();

		// Flytta cursorn in i dialogen så att den hamnar i samma top layer
		cvDialog.appendChild(customCursor);
	});

	closeCvBtn.addEventListener("click", function handleCloseCvDialog(): void {
		cvDialog.close();
		// Flytta tillbaka cursorn till body eller ursprunglig förälder
		if (originalCursorParent) {
			originalCursorParent.appendChild(customCursor);
		}
	});
}

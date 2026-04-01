export function initCvDialog(): void {
	const openCvBtn = document.querySelector<HTMLButtonElement>("#openCvBtn");
	const closeCvBtn = document.querySelector<HTMLButtonElement>("#closeCvBtn");
	const cvDialog = document.querySelector<HTMLDialogElement>("#cvDialog");

	if (!openCvBtn || !closeCvBtn || !cvDialog) {
		return;
	}

	openCvBtn.addEventListener("click", function handleOpenCvDialog(): void {
		cvDialog.showModal();
	});

	closeCvBtn.addEventListener("click", function handleCloseCvDialog(): void {
		cvDialog.close();
	});
}

const bingoItems: string[] = [
	"Biome över ESLint & Prettier",
	"Starka känslor för typografi",
	"Spacing ska absolut petas i",
	"TODO-listor är dunder",
	"Auto layout räddar liv",
	"2px off känns i själen",
	"Kan inte släppa en halvbra hover",
	"Alt-texter ska också ha kärlek",
	"Grid ska sitta som en smäck",
	"Bra copy gör mig knäsvag",
	"Bilder ska lira med brand",
	"Rätt ikon = guld",
	"Älskar inte grova box-shadows",
	"Kaffe & kod = sant",
	"Älskar beanies & solbrillor",
	"En sucker för Mac",
];

function shuffleArray(items: string[]): string[] {
	const shuffledItems = [...items];

	for (let index = shuffledItems.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(Math.random() * (index + 1));

		[shuffledItems[index], shuffledItems[randomIndex]] = [
			shuffledItems[randomIndex],
			shuffledItems[index],
		];
	}

	return shuffledItems;
}

const shuffledBingoItems = shuffleArray(bingoItems);

function getBoardSize(): number {
	return window.innerWidth <= 900 ? 3 : 4;
}

function getWinningPatterns(boardSize: number): number[][] {
	const patterns: number[][] = [];

	// Horisontella rader
	for (let row = 0; row < boardSize; row++) {
		const rowPattern: number[] = [];

		for (let col = 0; col < boardSize; col++) {
			rowPattern.push(row * boardSize + col);
		}

		patterns.push(rowPattern);
	}

	// Vertikala rader
	for (let col = 0; col < boardSize; col++) {
		const colPattern: number[] = [];

		for (let row = 0; row < boardSize; row++) {
			colPattern.push(row * boardSize + col);
		}

		patterns.push(colPattern);
	}

	// Diagonal vänster till höger
	const diagonalOne: number[] = [];
	for (let index = 0; index < boardSize; index++) {
		diagonalOne.push(index * boardSize + index);
	}
	patterns.push(diagonalOne);

	// Diagonal höger till vänster
	const diagonalTwo: number[] = [];
	for (let index = 0; index < boardSize; index++) {
		diagonalTwo.push(index * boardSize + (boardSize - 1 - index));
	}
	patterns.push(diagonalTwo);

	return patterns;
}

function checkForBingo(selectedIndexes: number[], boardSize: number): boolean {
	const winningPatterns = getWinningPatterns(boardSize);

	return winningPatterns.some((pattern) => {
		return pattern.every((index) => selectedIndexes.includes(index));
	});
}

function resetBingoBoard(): void {
	selectedIndexes = [];
	hasBingo = false;
	clearBingoWinState();
	renderBingoBoard();
}

function hideWinMsg(): void {
	const bingoWinMsg = document.querySelector<HTMLElement>("#bingoWinMsg");

	if (!bingoWinMsg) {
		return;
	}

	bingoWinMsg.hidden = true;
}

function setBingoWinState(): void {
	const bingoWrap = document.querySelector<HTMLElement>("#bingoWrap");
	const bingoWinMsg = document.querySelector<HTMLElement>("#bingoWinMsg");

	bingoWrap?.classList.add("hasBingo");
	if (bingoWinMsg) {
		bingoWinMsg.hidden = false;
	}
}

function clearBingoWinState(): void {
	const bingoWrap = document.querySelector<HTMLElement>("#bingoWrap");
	const bingoWinMsg = document.querySelector<HTMLElement>("#bingoWinMsg");

	bingoWrap?.classList.remove("hasBingo");
	if (bingoWinMsg) {
		bingoWinMsg.hidden = true;
	}
}

let selectedIndexes: number[] = [];
let hasBingo = false;

function renderBingoBoard(): void {
	const bingoBoard = document.querySelector<HTMLElement>("#bingoBoard");
	if (!bingoBoard) {
		return;
	}
	hideWinMsg();

	bingoBoard.innerHTML = "";

	const isSmallScreen = window.innerWidth <= 900;

	// Visa 9 rutor på mindre skärmar, annars alla 16
	const visibleItems = isSmallScreen
		? shuffledBingoItems.slice(0, 9)
		: shuffledBingoItems;

	visibleItems.forEach((item, index) => {
		const bingoCell = document.createElement("button");

		bingoCell.type = "button";

		bingoCell.textContent = item;

		bingoCell.classList.add("bingoCell");

		bingoCell.addEventListener("click", () => {
			const isSelected = selectedIndexes.includes(index);

			// Tillåt alltid avmarkering
			if (isSelected) {
				selectedIndexes = selectedIndexes.filter(
					(selectedIndex) => selectedIndex !== index,
				);
				bingoCell.classList.remove("is-selected");

				// Om man avmarkerar efter bingo, lås upp igen
				hasBingo = false;

				// const bingoBoard = document.querySelector<HTMLElement>("#bingoBoard");
				clearBingoWinState();
				return;
			}

			// Om bingo redan finns, stoppa nya markeringar
			if (hasBingo) {
				return;
			}

			// Markera ny ruta
			selectedIndexes.push(index);
			bingoCell.classList.add("is-selected");

			const boardSize = getBoardSize();
			const bingoFound = checkForBingo(selectedIndexes, boardSize);

			if (bingoFound) {
				hasBingo = true;
				setBingoWinState();
			}
		});

		bingoBoard.appendChild(bingoCell);
	});
}

export function initBingoBoard(): void {
	let currentBoardSize = getBoardSize();

	selectedIndexes = [];
	hasBingo = false;

	const bingoBoard = document.querySelector<HTMLElement>("#bingoBoard");
	bingoBoard?.classList.remove("hasBingo");
	hideWinMsg();

	const playAgainBtn =
		document.querySelector<HTMLButtonElement>("#playAgainBtn");
	playAgainBtn?.addEventListener("click", () => {
		resetBingoBoard();
	});

	renderBingoBoard();

	window.addEventListener("resize", () => {
		const newBoardSize = getBoardSize();

		if (newBoardSize !== currentBoardSize) {
			currentBoardSize = newBoardSize;
			selectedIndexes = [];
			hasBingo = false;

			clearBingoWinState();

			renderBingoBoard();
		}
	});
}

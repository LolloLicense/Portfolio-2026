import "./style.scss";
import { initCvDialog } from "./Ts/cvDialog";
import { initCaseSwiper } from "./Ts/caseSwiper";
import { initBingoBoard } from "./Ts/bingo";
import { initContactSpotlight } from "./Ts/contactSpotlight";
import { initCustomCursor } from "./Ts/customCursor";
import { initThemeToggle } from "./Ts/themeToggle";

initThemeToggle();
initBingoBoard();
initCaseSwiper();
initCvDialog();
initContactSpotlight();
initCustomCursor();

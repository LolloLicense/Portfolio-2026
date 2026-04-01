import Swiper from "swiper";
import { Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";

/**
 * Initializes the case slider.
 */
export function initCaseSwiper(): void {
	const swiperElement = document.querySelector<HTMLElement>(".caseSwiper");
	if (!swiperElement) return;

	new Swiper(".caseSwiper", {
		modules: [Navigation, Keyboard],
		slidesPerView: 3,
		spaceBetween: 16,

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 12,
			},
			500: {
				slidesPerView: 1,
				spaceBetween: 12,
			},
			700: {
				slidesPerView: 2,
				spaceBetween: 12,
			},
			900: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
		},
	});
}

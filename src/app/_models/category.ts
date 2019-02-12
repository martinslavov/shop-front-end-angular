import { i18n, Product } from './index';

export interface Category {
	id: number;
	categoryId: number;
	product: Product[];
	text: {
		bg: i18n,
		en: i18n,
		ru: i18n
	}
	enabled: boolean;
	alt: string;
}
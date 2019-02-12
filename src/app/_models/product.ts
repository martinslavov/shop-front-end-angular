import { ID } from '@datorama/akita';

import { i18n } from './i18n';

export type Product = {
    id: ID;
    quantity: number;
    href: string;
    price: number;
    text: {
        bg: i18n,
        en: i18n,
        ru: i18n
    }
    created: string;
    updated: string;
    enabled: boolean;
    image: string;
    bestSaller: boolean;
    discount: number;
    sale: boolean;
    alt: string;
}
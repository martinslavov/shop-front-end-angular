import { ID } from '@datorama/akita';

import { i18n } from '../../_models/i18n';

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
    enabled: boolean;
}
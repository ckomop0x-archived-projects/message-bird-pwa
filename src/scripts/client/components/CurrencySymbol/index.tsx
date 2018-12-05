import * as React from 'react';

export interface LeftMenuProps {
    currency: string;
}

const CurrencySymbol = (props: LeftMenuProps): JSX.Element => {
    let currencySymbol: string;

    switch (props.currency) {
        case 'euros':
            currencySymbol = '\u20AC';
            break;
        case 'pounds':
            currencySymbol = '\u00A3';
            break;
        case 'credits':
            currencySymbol = 'credits';
            break;
        case 'dollars':
        default:
            currencySymbol = '\u0024';
    }

    return <span>{currencySymbol}</span>;
};

export default CurrencySymbol;

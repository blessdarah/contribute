/**
 * @method formatAsCurrency
 * @param {number} amount - Amount
 * @param {currency} [currency] - The currency to format the amount. e.g USD, XAF
 * @returns {string}
 * */
export const formatAsCurrency = (amount, currency = "xaf") => {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
    });
};

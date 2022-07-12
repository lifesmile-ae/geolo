/***
 * Get Discount Price of Product
 * @param price
 * @param discount
 * @returns {number|*}
 */
export const getDiscountPrice = (price, discount, currency) => {
  let percent = (discount + 100) / 100;
  let amount = Math.round(price / percent);
  return currency && currency === '$' ? amount * process.env.USD_RATE : amount;
};

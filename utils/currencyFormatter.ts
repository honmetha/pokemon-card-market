export const currencyFormatter = (amount: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount).replace(/^(\D+)/, "$1 ");
};

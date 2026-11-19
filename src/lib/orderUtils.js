
export const calculateOrderTotals = (items) => {
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shipping = subtotal >= 100000 ? 0 : 2500;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};
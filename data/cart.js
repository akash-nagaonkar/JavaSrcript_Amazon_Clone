export const cart = [];

export const addToCart = (productId, productName) => {
  let matchedItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchedItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  if (matchedItem) {
    matchedItem.quantity = quantity;
  } else {
    cart.push({
      id: productId,
      productName: productName,
      quantity: quantity,
    });
  }
};

export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export const addToCart = (productId) => {
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
      quantity: quantity,
    });
  }
};

export const deleteFromCart = (productId) => {
  cart = cart.filter((cartItem) => cartItem.id !== productId);
};

export let cart;

export const loadFromStorage = () => {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
};

loadFromStorage();

const saveToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

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

  if (quantitySelector) {
    const quantity = Number(quantitySelector.value);

    if (matchedItem) {
      matchedItem.quantity = quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    saveToStorage();
  } else {
    console.error(`Quantity selector for product ${productId} not found.`);
  }

  saveToStorage();
};

export const deleteFromCart = (productId) => {
  cart = cart.filter((cartItem) => cartItem.id !== productId);
  saveToStorage();
};

export const updateCartQuantity = () => {
  let quantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${quantity} Items`;
  return quantity;
};

export const updateItemFromCart = (productId, newQuantity) => {
  let productToUpdate = cart.find((cartItem) => cartItem.id === productId);
  productToUpdate.quantity = newQuantity;
  updateCartQuantity();
  saveToStorage();
  updatedCount(productId);
};

export const validateCount = (productId) => {
  const validateCountSelector = document.querySelector(
    `.js-validate-count-to-update-${productId}`
  );
  validateCountSelector.style.display = "block";
  validateCountSelector.innerHTML =
    "Count must be greater than 0 and less than 100!";

  setTimeout(() => {
    validateCountSelector.style.display = "none";
  }, 3000);
};

export const updatedCount = (productId) => {
  const updatedCountSelector = document.querySelector(
    `.js-updated-count-${productId}`
  );
  updatedCountSelector.style.display = "block";
  updatedCountSelector.innerHTML = "Count is updated successfully!";

  setTimeout(() => {
    updatedCountSelector.style.display = "none";
  }, 3000);
};

export const updateDeliveryOption = (productId, deliveryOptionId) => {
  const productToUpdate = cart.find((cartItem) => cartItem.id === productId);
  productToUpdate.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};

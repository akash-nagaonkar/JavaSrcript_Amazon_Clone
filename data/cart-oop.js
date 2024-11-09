const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));

    if (!this.cartItems) {
      this.cartItems = [
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
  },

  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
  },

  addToCart(productId) {
    let matchedItem;

    this.cartItems.forEach((cartItem) => {
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
        this.cartItems.push({
          id: productId,
          quantity: quantity,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    } else {
      console.error(`Quantity selector for product ${productId} not found.`);
    }

    this.saveToStorage();
  },

  deleteFromCart(productId) {
    this.cartItems = cart.filter((cartItem) => cartItem.id !== productId);
    this.saveToStorage();
  },

  updateCartQuantity() {
    let quantity = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${quantity} Items`;
    return quantity;
  },

  updateItemFromCart(productId, newQuantity) {
    let productToUpdate = this.cartItems.find(
      (cartItem) => cartItem.id === productId
    );
    productToUpdate.quantity = newQuantity;
    this.updateCartQuantity();
    this.saveToStorage();
    this.updatedCount(productId);
  },

  validateCount(productId) {
    const validateCountSelector = document.querySelector(
      `.js-validate-count-to-update-${productId}`
    );
    validateCountSelector.style.display = "block";
    validateCountSelector.innerHTML =
      "Count must be greater than 0 and less than 100!";

    setTimeout(() => {
      validateCountSelector.style.display = "none";
    }, 3000);
  },

  updatedCount(productId) {
    const updatedCountSelector = document.querySelector(
      `.js-updated-count-${productId}`
    );
    updatedCountSelector.style.display = "block";
    updatedCountSelector.innerHTML = "Count is updated successfully!";

    setTimeout(() => {
      updatedCountSelector.style.display = "none";
    }, 3000);
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    const productToUpdate = this.cartItems.find(
      (cartItem) => cartItem.id === productId
    );
    productToUpdate.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  },
};

cart.loadFromStorage();

const businesscart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-business"));

    if (!this.cartItems) {
      this.cartItems = [
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
  },

  saveToStorage() {
    localStorage.setItem("cart-business", JSON.stringify(this.cartItems));
  },

  addToCart(productId) {
    let matchedItem;

    this.cartItems.forEach((cartItem) => {
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
      this.cartItems.push({
        id: productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  },

  deleteFromCart(productId) {
    this.cartItems = cart.filter((cartItem) => cartItem.id !== productId);
    this.saveToStorage();
  },

  updateCartQuantity() {
    let quantity = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${quantity} Items`;
    return quantity;
  },

  updateItemFromCart(productId, newQuantity) {
    let productToUpdate = this.cartItems.find(
      (cartItem) => cartItem.id === productId
    );
    productToUpdate.quantity = newQuantity;
    this.updateCartQuantity();
    this.saveToStorage();
    this.updatedCount(productId);
  },

  validateCount(productId) {
    const validateCountSelector = document.querySelector(
      `.js-validate-count-to-update-${productId}`
    );
    validateCountSelector.style.display = "block";
    validateCountSelector.innerHTML =
      "Count must be greater than 0 and less than 100!";

    setTimeout(() => {
      validateCountSelector.style.display = "none";
    }, 3000);
  },

  updatedCount(productId) {
    const updatedCountSelector = document.querySelector(
      `.js-updated-count-${productId}`
    );
    updatedCountSelector.style.display = "block";
    updatedCountSelector.innerHTML = "Count is updated successfully!";

    setTimeout(() => {
      updatedCountSelector.style.display = "none";
    }, 3000);
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    const productToUpdate = this.cartItems.find(
      (cartItem) => cartItem.id === productId
    );
    productToUpdate.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  },
};

businesscart.loadFromStorage();

console.log(cart);
console.log(businesscart);


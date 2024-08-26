import {
  cart,
  deleteFromCart,
  updateCartQuantity,
  updateDeliveryOption,
  updateItemFromCart,
  validateCount,
} from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const renderOrderSummary = () => {
  const today = dayjs();
  let cartSummaryHTML = "";

  const deliveryOptionsHTML = (productData, cartItem) => {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-delivery-option-id = "${
        deliveryOption.id
      }" data-product-id = "${productData.id}">
        <input
          ${isChecked ? "checked" : ""}
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${productData.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>
     `;
    });

    return html;
  };

  cart.forEach((cartItem) => {
    const productId = cartItem.id;
    const productData = products.find((product) => product.id === productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productData.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

          <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${productData.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${productData.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  productData.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    productData.id
                  }">${cartItem.quantity}</span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${
                    productData.id
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    productData.id
                  }">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${
                    productData.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
                    productData.id
                  }">
                    Delete
                  </span>
                </div>

                <div class="validate-count-to-update js-validate-count-to-update-${
                  productData.id
                }">
                </div>
                <div class="updated-count js-updated-count-${productData.id}">
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(productData, cartItem)}
            </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  updateCartQuantity();

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      deleteFromCart(productId);
      updateCartQuantity();

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity > 100 || newQuantity <= 0) {
        validateCount(productId);
      } else {
        container.classList.remove("is-editing-quantity");
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          newQuantity;
        updateItemFromCart(productId, newQuantity);
      }
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary()
    });
  });
};
renderOrderSummary();

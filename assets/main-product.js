if (!customElements.get("variant-selector")) {
  class VariantSelector extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.loadProduct();
      this.onClickFn();
    }
    onClickFn() {
      this.addEventListener("click", (e) => {
        const option = e.target.closest(".option-value");
        if (!option) return;
        const parent = option.dataset.parent;
        this.querySelectorAll(`.option-value[data-parent="${parent}"]`).forEach(
          (el) => el.classList.remove("active"),
        );
        option.classList.add("active");
        console.log("Selected:", option.dataset.value);
        if (parent.toLowerCase() === "color") {
          const colorLabel = this.querySelector(".selected-variant-color");
          if (colorLabel) {
            colorLabel.innerHTML = option.dataset.value;
          }
        }
        this.updateInfo(this.product);
      });
    }
    findVariant(product) {
      const selectedOptions = Array.from(
        this.querySelectorAll(".option-value.active"),
      ).map((el) => el.dataset.value);
      const variant = product.variants.find((v) =>
        selectedOptions.every((opt) => v.options.includes(opt)),
      );
      this.updateUrl(variant.id, variant.available);
      return variant;
    }
    updateUrl(variantId, available) {
      if (!variantId) return;
      const url = new URL(window.location.href);
      url.searchParams.set("variant", variantId);
      url.searchParams.set("available", available);
      window.history.replaceState({}, "", url);
    }
    formatMoney(cents, currency = "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(cents / 100);
    }
    updateInfo(product) {
      const variant = this.findVariant(product);
      const addToCartBtn = document.querySelector("#add_to_cart_button");
      if (addToCartBtn) {
        addToCartBtn.disabled = !variant.available;
        if (!variant.available) {
          addToCartBtn.classList.add("cart-button-disable");
        } else {
          addToCartBtn.classList.remove("cart-button-disable");
        }
      }
      const compareEl = document.querySelector(".compare-price");
      const priceEl = document.querySelector(".product-price");

      if (compareEl && variant.compare_at_price) {
        compareEl.innerHTML = this.formatMoney(
          variant.compare_at_price,
          Shopify.currency.active,
        );
      }

      if (priceEl) {
        priceEl.innerHTML = this.formatMoney(
          variant.price,
          Shopify.currency.active,
        );
      }
      const variantInput = document.querySelector('input[name="id"]');
      if (variantInput) {
        variantInput.value = variant.id;
      }
    }

    loadProduct() {
      const productData = this.dataset.product;
      if (productData) {
        this.product = JSON.parse(productData);
        this.findVariant(this.product);
      }
      console.log(this.product);
    }
  }
  if (!customElements.get("variant-selector")) {
    customElements.define("variant-selector", VariantSelector);
  }
}

if (!customElements.get("quantity-selector")) {
  class QuantitySelector extends HTMLElement {
    connectedCallback() {
      const leftbtn = this.querySelector("#decrease_quantity_btn");
      const rightbtn = this.querySelector("#increase_quantity_btn");
      if (!leftbtn || !rightbtn) return;
      leftbtn.addEventListener("click", () => this.updateQuantity("minus"));
      rightbtn.addEventListener("click", () => this.updateQuantity("plus"));
    }
    updateQuantity(action) {
      const hiddenInput =
        this.closest("cart-handler").querySelector(".product_quantity");
      const quantityView = this.querySelector(".product_quantity_view");
      if (!hiddenInput || !quantityView) return;
      let qty = parseInt(hiddenInput.value);
      if (action === "plus") {
        if (qty < 20) qty++;
      } else {
        if (qty > 1) qty--;
      }
      hiddenInput.value = qty;
      quantityView.textContent = qty;
    }
  }
  customElements.define("quantity-selector", QuantitySelector);
}


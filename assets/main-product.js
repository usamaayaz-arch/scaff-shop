if (!customElements.get("variant-selector")) {
  class VariantSelector extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.onClickFn();
      this.loadProduct();
    }
    onClickFn() {
      this.addEventListener("click", (e) => {
        const option = e.target.closest(".option-value");
        if (!option) return;
        const parent = option.dataset.parent;
        document
          .querySelectorAll(`.option-value[data-parent="${parent}"]`)
          .forEach((el) => el.classList.remove("active"));
        option.classList.add("active");
        console.log("Selected:", option.dataset.value);
        this.updateInfo(this.product);
      });
    }
    findVariant(product) {
      const selectedOptions = Array.from(
        document.querySelectorAll(".option-value.active"),
      ).map((el) => el.dataset.value);
      const variant = product.variants.find((v) =>
        selectedOptions.every((opt) => v.options.includes(opt)),
      );
      return variant;
    }
    formatMoney(cents, currency = "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(cents / 100);
    }
updateInfo(product) {
  const variant = this.findVariant(product);
  const formated_price = this.formatMoney(variant.price,Shopify.currency.active);
  document.getElementsByClassName("product-price")[0].innerHTML = formated_price;
  console.log(formated_price);
}

    loadProduct() {
      const productData = this.dataset.product;
      if (productData) {
        this.product = JSON.parse(productData);
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
    constructor() {
      super();
    }

    connectedCallback() {
      const leftbtn = document.getElementById("decrease_quantity_btn");
      const rightbtn = document.getElementById("increase_quantity_btn");

      leftbtn.addEventListener("click", () => this.updateQuantity("minus"));
      rightbtn.addEventListener("click", () => this.updateQuantity("plus"));
    }

    updateQuantity(action) {
      const product_hidden_quantity = this.querySelector("#product_quantity");
      const product_quantity_view = this.querySelector(".product_quantity_view");
      console.log(product_quantity_view);
      console.log(product_hidden_quantity);

      if (!product_hidden_quantity || !product_quantity_view) return;

      let qty = parseInt(product_hidden_quantity.value);
      
      if (action === "plus"){ if(qty < 20){qty++;}}
      else if (qty > 1) qty--;
      
      product_hidden_quantity.value = qty;
      product_quantity_view.textContent = qty;
      console.log(qty);
    }
  }

  customElements.define("quantity-selector", QuantitySelector);
}

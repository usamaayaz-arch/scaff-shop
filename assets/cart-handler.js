class CartHandler extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector("#add_to_cart_button");
    const form = this.querySelector("form");
    if (!button || !form) return;

    button.addEventListener("click", async (e) => {
      e.preventDefault();

      button.disabled = true;
      button.classList.add("cart-button-disable");

      try {
        const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: "POST",

          body: new FormData(form),
        });

        if (!res.ok) throw new Error("Cart request failed");

        const data = await res.json();

        console.log("Added to cart:", data);

        document.dispatchEvent(new CustomEvent("cart:updated", { detail: data }),);
      } catch (err) {
        console.error("Cart error:", err);
      } finally {
        button.disabled = false;
        button.classList.remove("cart-button-disable");
      }
    });
  }
}

if (!customElements.get("cart-handler")) {
  customElements.define("cart-handler", CartHandler);
}

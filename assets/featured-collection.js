if (!customElements.get("featured-collection-selector")) {
  class FeaturedCollectionSelector extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {}
  }
}

if (!customElements.get("cart-handler")) {
  class CartHandler extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {}
  }

  customElements.define("cart-handler", CartHandler);
}

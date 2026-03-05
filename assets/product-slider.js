if (!customElements.get('product-slider')) {
  class ProductSlider extends HTMLElement {
  connectedCallback() {
    this.container = this.querySelector('.products');
    this.backBtn = this.querySelector('.back_button');
    this.forwardBtn = this.querySelector('.forward_button');

    this.scrollAmount = () => this.container.clientWidth;

    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        this.container.scrollBy({
          left: -this.scrollAmount(),
          behavior: 'smooth'
        });
      });
    }

    if (this.forwardBtn) {
      this.forwardBtn.addEventListener('click', () => {
        this.container.scrollBy({
          left: this.scrollAmount(),
          behavior: 'smooth'
        });
      });
    }
  }
}

customElements.define('product-slider', ProductSlider);
}
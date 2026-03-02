class AnnouncementSlider extends HTMLElement {
  constructor() {
    super();
    this.current = 0;
    this.timer = null;
    this.intervalTime = parseInt(this.dataset.interval, 10) || 4000;

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  connectedCallback() {
    // Delay to ensure children are rendered
    requestAnimationFrame(() => this.init());
  }

  init() {
    this.slides = this.querySelectorAll(".announcement__slide");
    this.nextBtn = this.parentElement.querySelector(
      ".announcement__control--next",
    );
    this.prevBtn = this.parentElement.querySelector(
      ".announcement__control--prev",
    );

    if (!this.slides.length) return;

    // Always show first slide initially
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.slides[0].classList.add("active");

    if (this.slides.length === 1) return;

    this.nextBtn?.addEventListener("click", this.handleNext);
    this.prevBtn?.addEventListener("click", this.handlePrev);

    this.startAutoPlay();
  }

  handleNext() {
    this.showSlide(this.current + 1);
  }

  handlePrev() {
    this.showSlide(this.current - 1);
  }

  showSlide(index) {
    this.slides[this.current].classList.remove("active");

    this.current = (index + this.slides.length) % this.slides.length;

    this.slides[this.current].classList.add("active");
  }

  startAutoPlay() {
    this.stopAutoPlay();

    this.timer = setInterval(() => {
      this.showSlide(this.current + 1);
    }, this.intervalTime);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  disconnectedCallback() {
    this.stopAutoPlay();
  }
}

if (!customElements.get("announcement-slider")) {
  customElements.define("announcement-slider", AnnouncementSlider);
}

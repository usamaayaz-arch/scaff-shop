if (!customElements.get("header-menu")) {
  class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const hamburger = this.querySelector(".mini-menu-icon");
      const miniDrawer = this.querySelector(".mini-drawer-menu");
      const closeBtn = this.querySelector(
        '.site-header__icon[aria-label="Close"]',
      );
      if (!miniDrawer) return;

      // Function to open drawer
      const openDrawer = () => {
        miniDrawer.classList.add("active");
        document.body.style.overflow = "hidden";
      };

      // Function to close drawer
      const closeDrawer = () => {
        miniDrawer.classList.remove("active");
        document.body.style.overflow = "";
      };

      if (hamburger) {
        hamburger.addEventListener("click", openDrawer);
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
      }

      miniDrawer.addEventListener("click", (e) => {
        if (e.target === miniDrawer) closeDrawer();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && miniDrawer.classList.contains("active")) {
          closeDrawer();
        }
      });
    }
  }

  // Define custom element if not defined
  if (!customElements.get("header-menu")) {
    customElements.define("header-menu", Header);
  }
}

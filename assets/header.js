if (!customElements.get("header-icon")) {
  class HeaderIcon extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const temp = document.getElementById("header-search-icon");
      const overlay = document.getElementsByClassName("search-overlay")[0];

      const searchProductForm = document.getElementById("searchProductForm");
      temp.addEventListener("click", () => {
        searchProductForm.style.display = "flex";
        overlay.style.display = "unset";
        searchProductForm.classList.add("search-form-header-active");
      });
    }
  }
  if (!customElements.get("header-icon")) {
    customElements.define("header-icon", HeaderIcon);
  }
}
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

// Input component
class NameInput extends HTMLElement {
  inputElement: HTMLInputElement | null;
  constructor() {
    super();
    this.innerHTML = `
      <input type="text" placeholder="Enter a name">
    `;
    this.inputElement = this.querySelector("input");
  }

  get value() {
    return this.inputElement ? this.inputElement.value : undefined;
  }

  clear() {
    if (this.inputElement) {
      this.inputElement.value = "";
    }
  }
}

// Button component
class UpdateButton extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <button>Update Name</button>
    `;
    this.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("update-name", { bubbles: true }));
    });
  }
}

// Display component
class NameDisplay extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this.render();
    }
  }

  render() {
    const name = this.getAttribute("name") || "World";
    this.innerHTML = `
      <div>Hello, ${name}!</div>
    `;
  }
}

class myApp extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.addEventListener("update-name", this.updateName);
  }

  updateName = (_event) => {
    const myNameInput = this.querySelector("name-input");
    const myNameDisplay = this.querySelector("name-display");
    const newName = myNameInput?.value;
    myNameDisplay?.setAttribute("name", newName);
    myNameInput?.clear();
  };

  render() {
    this.innerHTML = `
    <name-input></name-input>
    <update-button></update-button>
    <name-display></name-display>
    `;
  }
}

// Register custom elements
customElements.define("name-input", NameInput);
customElements.define("update-button", UpdateButton);
customElements.define("name-display", NameDisplay);
customElements.define("my-app", myApp);

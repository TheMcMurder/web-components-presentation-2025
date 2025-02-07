// Input component
class NameInput extends HTMLElement {
  inputElement: HTMLInputElement | null;
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
      input {
      margin: 10px 0;
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
      }
      </style>
      <input type="text" placeholder="Enter a name">
    `;
    this.inputElement = shadow.querySelector("input") as HTMLInputElement;
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
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
      body {
        background-color: dimgray;
      }
      button {
        background-color: dimgray;
    margin: 10px 0;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
      }
    </style>
      <button>Update Name</button>
    `;
    shadow.querySelector("button")?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("update-name", { bubbles: true, composed: true }),
      );
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
    const shadow = this.attachShadow({ mode: "open" });
    const name = this.getAttribute("name") || "Shadow Dom";
    shadow.innerHTML = `
      <style>
        div {
          font-size: 18px;
          margin-top: 20px;
        }
      </style>
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

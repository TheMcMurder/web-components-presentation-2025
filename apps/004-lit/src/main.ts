import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

// Input component
@customElement("name-input")
class NameInput extends LitElement {
  @query("input")
  inputElement!: HTMLInputElement;

  static styles = css`
    input {
      margin: 10px 0;
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  render() {
    return html` <input type="text" placeholder="Enter a name" /> `;
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
@customElement("update-button")
class UpdateButton extends LitElement {
  static styles = css`
    input {
      margin: 10px 0;
      padding: 5px;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  updateEvent = () => {
    this.dispatchEvent(
      new CustomEvent("update-name", { bubbles: true, composed: true }),
    );
  };

  render() {
    return html` <button @click="${this.updateEvent}">Update Name</button> `;
  }
}

// Display component
@customElement("name-display")
export class NameDisplay extends LitElement {
  static styles = css`
    div {
      font-size: 18px;
      margin-top: 20px;
    }
  `;

  @property({ type: String })
  name = "🔥";

  render() {
    return html`<div>Hello, ${this.name}!</div>`;
  }
}

@customElement("my-app")
class myApp extends LitElement {
  updateName = (_event) => {
    const myNameInput = this.renderRoot.querySelector("name-input");
    const myNameDisplay = this.renderRoot.querySelector("name-display");
    const newName = myNameInput?.value;
    myNameDisplay?.setAttribute("name", newName);
    myNameInput?.clear();
  };

  render() {
    return html`
      <name-input></name-input>
      <update-button @update-name=${this.updateName}></update-button>
      <name-display></name-display>
    `;
  }
}

import React, {useActionState} from 'react';
import { useFormStatus } from 'react-dom';
import { createRoot } from 'react-dom/client'

function NameInput() {
  return (
    <input className="name-input" type="text" name="name" placeholder="Enter your name" />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="update-button" type="submit" disabled={pending}>
      Submit
    </button>
  );
}

function NameDisplay({ name }) {
  return <div className="name-display">Hello, {name || 'Stranger'}!</div>;
}

async function submitAction(_prevState, formData) {
  const name = formData.get('name');
  return { name };
}

function App() {
  const [state, formAction] = useActionState(submitAction, { name: '' });

  return (
    <div>
      <form action={formAction}>
        <NameInput />
        <SubmitButton />
      </form>
      <NameDisplay name={state.name} />
    </div>
  );
}


const domNode = document.querySelector('react-app');
const root = createRoot(domNode);
root.render(<App/>);

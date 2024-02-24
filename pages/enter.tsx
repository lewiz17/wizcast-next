// PinForm.js
import { useState } from "react";

const PinForm = ({ onSubmit }) => {
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>PIN de 4 Digitos</span>
      <input
        type="password"
        maxLength={4}
        value={pin}
        placeholder="Introduce el PIN"
        onChange={(e) => setPin(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default PinForm;

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
      <label>
        PIN de 4 dígitos:
        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </label>
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default PinForm;

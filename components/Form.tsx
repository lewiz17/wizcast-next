import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const initialFormValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValues(initialFormValues);
  };

  return (
    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-gray-700">Nombre</span>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Mensaje</span>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
        />
      </label>
      <button className="text-white bg-blue hover:bg-gray font-bold py-2 px-4 rounded">
        Enviar
      </button>
    </form>
  );
}

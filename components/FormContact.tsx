import { useState } from "react";

export default function ContactForm() {
  const [formValues, setFormvalues] = useState({
    mail: "",
    subject: "",
    message: "",
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contacto", ...formValues }),
    })
      .then(() => alert("Mensaje enviado!"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black dark:text-black">
          Escribenos...
        </h2>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black dark:text-gray-300"
            >
              Correo Electronico
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-[#021420e0] border border-gray text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="nombre@gmail.com"
              required
              value={formValues.mail}
              name="email"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-black dark:text-gray-300"
            >
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="asunto"
              className="shadow-sm bg-[#021420e0] border border-gray text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Describenos lo encontrado"
              required
              value={formValues.subject}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-black dark:text-gray-400"
            >
              Detalles del reporte
            </label>
            <textarea
              id="message"
              rows={6}
              name="mensaje"
              className="block p-2.5 w-full text-sm text-white bg-[#021420e0] rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Detalles de la falla (opcional)"
              value={formValues.message}
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-gray focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Enviar reporte
          </button>
        </form>
      </div>
    </section>
  );
}

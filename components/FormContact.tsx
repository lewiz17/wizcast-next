import { useState } from "react";

export default function ContactForm() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-screen-md">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfU7-An3s9DNgW1HGfL61kYxu9D3cJD5Qv858KnHIJ29huyhw/viewform?embedded=true"
          width="500"
          height="395"
          marginHeight={0}
          marginWidth={0}
        >
          Cargando…
        </iframe>
      </div>
    </section>
  );
}

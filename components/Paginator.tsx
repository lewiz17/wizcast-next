import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NextIcon, PrevIcon } from "./Icons";

export default function Paginator() {
  const [currentPage, setCurrentPage] = useState(1); // Cambié el valor inicial a 1
  const [totalPages, setTotalPages] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (router.query.page !== undefined) {
      const page = Number(router.query.page);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      } else {
        router.push(`/movies/1`); // Redirige a la página 1 si el valor de la página es inválido
      }
    }
  }, [router.query.page, totalPages]);

  const handlePrevPage = (e) => {
    e.preventDefault();

    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      router.push(`/movies/${prevPage}`);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      // Cambiado "<=" a "<" para evitar avanzar más allá de la última página
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      router.push(`/movies/${nextPage}`);
    }
  };

  return (
    <div className="paginator">
      <a
        href={""}
        className="prev"
        onClick={handlePrevPage}
        title={`${currentPage > 1 ? `Ir a pagina ${currentPage - 1}` : ""}`}
      >
        <PrevIcon />
      </a>
      <span>
        <strong>{currentPage}</strong> / {totalPages}
      </span>
      <a
        href={""}
        className="next"
        onClick={handleNextPage}
        title={`Ir a pagina ${currentPage + 1}`}
      >
        <NextIcon />
      </a>
    </div>
  );
}

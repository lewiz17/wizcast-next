import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Paginator({ page }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [parseInt(page)]);

  return (
    <div className="paginator">
      <ul className="paginate-wrap">
        {new Array(5).fill("").map((v, i) => {
          return i + 1 == 1 ? (
            currentPage == 1 ? (
              ""
            ) : (
              <li className={`page-item`} key={i + 1}>
                <Link href={`/`}>{i + 1}</Link>
              </li>
            )
          ) : (
            <li
              className={`page-item ${i + 1 == currentPage ? "active" : ""}`}
              key={i + 1}
            >
              <Link href={`/movies/${i + 1}`}>{i + 1}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

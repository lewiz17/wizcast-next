import React from "react";

export const VideoIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
    </svg>
  );
};

export const BackIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const StarIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="si-glyph si-glyph-circle-star"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      style={{ display: "inline-flex" }}
      {...props}
    >
      <title>{"1047"}</title>
      <path
        fill="#ffd438"
        fillRule="evenodd"
        d="M8 .062c-4.419 0-8 3.559-8 7.947 0 4.39 3.581 7.949 8 7.949 4.418 0 8-3.56 8-7.949C16 3.621 12.418.062 8 .062Zm3.108 11.963L8.021 9.902l-3.088 2.123L6.112 8.59 3.024 6.465h3.817l1.18-3.435 1.18 3.435h3.816L9.93 8.59l1.178 3.435Z"
        className="si-glyph-fill"
      />
    </svg>
  );
};

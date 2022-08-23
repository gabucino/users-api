import React from "react";

export default function PageNumber({ currentPage, value, handleClick }) {
  return (
    <li>
      <button
        value={value}
        className="pagenumber-button"
        onClick={handleClick}
        disabled={currentPage == value}
      >
        {value}
      </button>
    </li>
  );
}

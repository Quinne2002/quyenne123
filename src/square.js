import React from "react";

export default function Square({ onClick, value }) {
  let image;
  if (value === "X") {
    image = <img src={process.env.PUBLIC_URL + "/huy.png"} alt="X" style={{ maxWidth: "98px" }} />

  } else if (value === "O") {
    image = <img src={process.env.PUBLIC_URL + "/anh.png"} alt="O" style={{ maxWidth: "98px" }}/>;
  }
  return (
    <button className="square" onClick={onClick}>
      {image}
    </button>
  );
}
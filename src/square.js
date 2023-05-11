import React from "react";

export default function Square({ onClick, value }) {
  let image;
  if (value === "X") {
    image = <img src={process.env.PUBLIC_URL + "/huy.png"} alt="Cute" style={{ maxWidth: "99px" }} />

  } else if (value === "O") {
    image = <img src={process.env.PUBLIC_URL + "/anh.png"} alt="O" style={{ maxWidth: "99px" }}/>;
  }
  return (
    <button className="square" onClick={onClick}>
      {image}
    </button>
  );
}

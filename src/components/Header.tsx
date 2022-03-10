import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";

const Header: React.FC = () => {
  // const [ title, setTitle ] = useState<string>("→この文章を消して大会名や部門名を入力←")

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   if (title === "→この文章を消して大会名や部門名を入力←") {
  //     document.title = "2setMatch";
  //   } else {
  //     document.title = title;
  //   }
  // });

  return (
    <div className="Header">
      <div className="WebTitle">2setMatch</div>
    </div>
  );
};

export default Header;

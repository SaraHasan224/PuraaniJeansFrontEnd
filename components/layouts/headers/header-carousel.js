import React, { useEffect, useState } from "react"

import MobileHeader from "./mobile-header";
import WebHeader from "./web-header";

const HeaderCarousel = () => {
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#ff4c3b");
  });
  

  function handleResize() {
    setWindowWidth(window.innerWidth)
  }

  return (
      windowWidth > 750 ? <WebHeader /> : <MobileHeader />  
  );
};

export default HeaderCarousel;

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Settings = () => {
  const layout_type = "ltr";
  const layout_version = "light";
  useEffect(() => {
    const bodyClass = document.body.classList
    document.body.className = `${bodyClass} ${layout_version}  ${layout_type}`;

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (process.browser) {
      if (document.documentElement.scrollTop > 600) {
        document.querySelector(".tap-top").style = "display: block";
      } else {
        document.querySelector(".tap-top").style = "display: none";
      }
    }
  };


  return (
      <ToastContainer />
  );
};

export default Settings;

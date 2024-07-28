import { useState, useEffect } from "react";
const getIsMobile = () => window.innerWidth <= 480;
function CheckMobileHook480() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return isMobile;
}

export default CheckMobileHook480;

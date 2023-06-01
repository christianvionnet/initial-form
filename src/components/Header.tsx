import LogoAIT from "../assets/icons/LogoAIT";
import { useEffect, useState } from "react";

const Header = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <header>
      <div className="logo-container">
        <a href="https://activandoit.com/" title="Activando IT">
          {windowSize.innerWidth < 1200 ? (
            <LogoAIT width={80} />
          ) : (
            <LogoAIT width={150} />
          )}
        </a>
      </div>
    </header>
  );
};

export default Header;

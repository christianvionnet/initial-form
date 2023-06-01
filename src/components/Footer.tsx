import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faYoutube,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import LogoSS from "../assets/icons/LogoSS";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
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
    <footer className="footer-container">
      <div className="media-container">
        <a
          href="https://www.linkedin.com/company/activandoit/"
          target="_blank"
          rel="noreferrer"
          title="Linked In"
        >
          {windowSize.innerWidth < 1200 ? (
            <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faLinkedinIn} size="3x" />
          )}
        </a>
        <a
          href="https://www.instagram.com/activandoit/"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          {windowSize.innerWidth < 1200 ? (
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          )}
        </a>
        <a
          href="https://www.youtube.com/@activandoit/"
          target="_blank"
          rel="noreferrer"
          title="YouTube"
        >
          {windowSize.innerWidth < 1200 ? (
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faYoutube} size="3x" />
          )}
        </a>
        <a
          href="https://discord.gg/4cXyBBAvB2/"
          target="_blank"
          rel="noreferrer"
          title="Discord"
        >
          {windowSize.innerWidth < 1200 ? (
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faDiscord} size="3x" />
          )}
        </a>
      </div>
      <div className="bottom-container">
        <p>Un producto desarrollado por</p>
        <div>
          {windowSize.innerWidth < 1200 ? (
            <LogoSS width={150} />
          ) : (
            <LogoSS width={200} />
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

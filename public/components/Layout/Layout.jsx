import { useState, useRef, useEffect } from "react";
import Menu from "../menu/menu";
import Link from "next/link";
import cn from "classnames";

const Layout = ({
  children,
  isInTransit,
  setIsInTransit,
  setIsMounted,
  layoutProps,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
      setIsInTransit(false);
      setIsMounted(true);
    }, 2800);
  }, []);

  return (
    <main className={"layout"}>
      <div className="layout__background" />
      <div className={"layout__frame-container"}>
        <div className={"layout__frame"}>
          {/* <Link href="/">
            <a
              className={"layout__header"}
              onClick={() => setIsInTransit(true)}
            >
              Erik Borge
            </a>
          </Link> */}
          {isInTransit && <div className={"layout__grain"} />}
          <div
            className={cn(
              "layout__content",
              {
                "layout__content-visible": showContent,
              },
              layoutProps?.map((theme) => `layout__content--${theme}`)
            )}
            id="Frame"
          >
            <button
              className={"layout__menu-button"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen ? "meny" : "lukk"}
            </button>
            {isMenuOpen ? (
              <Menu
                setIsMenuOpen={setIsMenuOpen}
                setIsInTransit={setIsInTransit}
              />
            ) : (
              <>{children} </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;

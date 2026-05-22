// src/useScrollReset.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's auto scroll restoration
    // This ensures our manual scroll reset takes precedence
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reset scroll to top on pathname change
    // Use requestAnimationFrame to ensure DOM is stable after route change
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

  }, [pathname]);
};

export default useScrollReset;
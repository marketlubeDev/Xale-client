import { useEffect } from "react";

export const usePreventBack = (): void => {
  useEffect(() => {
    // 1. Push state immediately on mount so there is a history entry to go "forward" to
    window.history.pushState(null, "", window.location.href);

    // 2. Handler for when the user clicks the "Back" button
    const handlePopState = (event: PopStateEvent) => {
      // Prevent the back action by pushing the state again immediately
      window.history.pushState(null, "", window.location.href);
    };

    // 3. Add event listener
    window.addEventListener("popstate", handlePopState);

    // 4. Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

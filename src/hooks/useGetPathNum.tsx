import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Allows pathNames to be optionally provided. If omitted, returns -1 as pathNum.
export function useGetPathNum(pathNames?: string[]) {
  const location = useLocation();
  const [pathNum, setPathNum] = useState(-1);

  useEffect(() => {
    if (Array.isArray(pathNames) && pathNames.length > 0) {
      const path = pathNames.findIndex((path) => path === location.pathname);
      setPathNum(path !== -1 ? path : -1);
    } else {
      setPathNum(-1);
    }
  }, [location.pathname, pathNames]);

  return { location: location.pathname, pathNum };
}

"use client";
import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {

    //  document.body.style.zoom = "80%"

    const preventZoom = (event) => {
      if (event.ctrlKey || event.metaKey || event.deltaY) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", preventZoom);

    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("keydown", preventZoom);
    };
  }, []);

  return null;
}

"use client";

import ReactDOM from "react-dom";

export function PreloadHeroResources({
  poster,
  src,
}: {
  src?: string | undefined;
  poster?: string | undefined;
}) {
  if (src) {
    ReactDOM.preload(src, {
      as: "video",
      fetchPriority: "high",
    });
  }

  if (poster) {
    ReactDOM.preload(poster, {
      as: "image",
      fetchPriority: "high",
    });
  }

  return null;
}

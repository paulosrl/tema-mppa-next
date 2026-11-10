"use client";

import { useState } from "react";
import type { ImageAsset } from "./types";
import { cn } from "./utils";

/** Imagem opcional: sem src ou com falha de carga, o elemento inteiro desaparece. */
export function ImageSlot({
  asset,
  className,
}: {
  asset?: ImageAsset | null;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!asset) return null;
  const { src, alt, width, height, className: assetClassName } = asset;
  if (!src || failedSrc === src) return null;

  return (
    // O consumidor pode fornecer arquivo local, URL assinada ou data URL; por isso não usamos next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("block object-contain", assetClassName, className)}
      onError={() => setFailedSrc(src)}
    />
  );
}

"use client";

import { useState } from "react";
import type { ImageAsset, LogoAsset } from "./types";
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

/**
 * Logo institucional do cabeçalho. Com `href`, vira link para o site, em nova aba, para quem está no sistema não
 * perder a tela; sem ele, é a imagem de `ImageSlot`. Como a imagem, o link some inteiro quando a imagem falta ou
 * falha: nunca sobra um link vazio. Logo decorativa (`alt` vazio) repete o link da logo ao lado, então fica fora
 * da tabulação e do leitor de tela, e continua clicável com o mouse.
 */
export function LogoSlot({ logo, className }: { logo: LogoAsset; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const href = logo.href?.trim();
  if (!href) return <ImageSlot asset={logo} className={className} />;
  const { src, alt, width, height, className: assetClassName } = logo;
  if (!src || failedSrc === src) return null;
  const decorativa = !alt.trim();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={decorativa ? undefined : `${alt} (abre em nova aba)`}
      tabIndex={decorativa ? -1 : undefined}
      aria-hidden={decorativa ? true : undefined}
      className="block shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- mesmo motivo de ImageSlot */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("block object-contain", assetClassName, className)}
        onError={() => setFailedSrc(src)}
      />
      {decorativa ? null : <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

/**
 * Marca d'água circular do quadro de abertura (`OpeningCard`): sempre decorativa (`alt=""`), girada e quase
 * transparente (`tm-watermark`). Como as outras imagens opcionais, o círculo inteiro some quando a imagem falta ou
 * falha. A posição chega por `className`.
 */
export function WatermarkSlot({ asset, className }: { asset?: ImageAsset | null; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!asset?.src || failedSrc === asset.src) return null;
  const { src, width, height, className: assetClassName } = asset;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 overflow-hidden rounded-full border border-tone-blue-foreground/15 select-none",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- mesmo motivo de ImageSlot */}
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        className={cn("tm-watermark size-full scale-[1.13] rounded-full object-contain", assetClassName)}
        onError={() => setFailedSrc(src)}
      />
    </div>
  );
}

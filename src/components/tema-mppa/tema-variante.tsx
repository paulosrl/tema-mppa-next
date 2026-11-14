"use client";

import { createContext, useContext } from "react";
import type { TemaVariant } from "./types";

export const TemaVarianteContext = createContext<TemaVariant>("padrao");

/** Variante do tema posta no `TemaMppaProvider`; sem provider, `"padrao"`. */
export function useTemaVariante(): TemaVariant {
  return useContext(TemaVarianteContext);
}

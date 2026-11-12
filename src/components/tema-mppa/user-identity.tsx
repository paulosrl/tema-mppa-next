"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { ImageSlot } from "./image-slot";
import type { ShellSession } from "./types";
import { displayName, initials } from "./utils";

/**
 * Identidade no cabeçalho: avatar redondo de 32px; nome e perfil ao lado a partir de 1280px; botão de
 * saída visível quando o consumidor passa `onSignOut`. O e-mail aparece ao passar o mouse. Sem sessão
 * (`null`, ainda a caminho), o espaço do avatar fica reservado, vazio, e o botão de sair continua.
 */
export function UserIdentity({
  session,
  signOutLabel = "Sair",
  onSignOut,
}: {
  session: ShellSession | null;
  signOutLabel?: string;
  onSignOut?: () => void;
}) {
  const role = session ? (session.profileLabel ?? (session.is_admin ? "Administrador" : "Usuário")) : null;

  return (
    <div className="flex min-w-0 items-center gap-2">
      {session ? (
        <div className="flex min-w-0 items-center gap-2" title={session.email}>
          <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-foreground">
            {initials(session)}
            <ImageSlot asset={session.avatar} className="absolute inset-0 size-full object-cover" />
          </span>
          <span className="hidden max-w-40 min-w-0 flex-col leading-tight xl:flex">
            <span className="truncate text-xs font-semibold">{displayName(session)}</span>
            <span className="truncate text-xs text-muted-foreground">{role}</span>
          </span>
        </div>
      ) : (
        <span className="size-8 shrink-0 rounded-full bg-muted" aria-hidden />
      )}
      {onSignOut ? (
        <Button variant="ghost" size="icon" onClick={onSignOut} aria-label={signOutLabel} title={signOutLabel}>
          <LogOut />
        </Button>
      ) : null}
    </div>
  );
}

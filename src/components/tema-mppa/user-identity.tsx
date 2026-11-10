"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { ImageSlot } from "./image-slot";
import type { ShellSession } from "./types";
import { displayName, initials } from "./utils";

export function UserIdentity({
  session,
  signOutLabel = "Sair",
  onSignOut,
}: {
  session: ShellSession;
  signOutLabel?: string;
  onSignOut?: () => void;
}) {
  const role = session.profileLabel ?? (session.is_admin ? "Administrador" : "Usuário");

  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex min-w-0 items-center gap-2" title={session.email}>
        <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold">
          {initials(session)}
          <ImageSlot asset={session.avatar} className="absolute inset-0 size-full object-cover" />
        </span>
        <span className="hidden max-w-40 min-w-0 flex-col leading-tight xl:flex">
          <span className="truncate text-xs font-semibold">{displayName(session)}</span>
          <span className="truncate text-xs text-muted-foreground">{role}</span>
        </span>
      </div>
      {onSignOut ? (
        <Button variant="ghost" size="icon" onClick={onSignOut} aria-label={signOutLabel} title={signOutLabel}>
          <LogOut />
        </Button>
      ) : null}
    </div>
  );
}

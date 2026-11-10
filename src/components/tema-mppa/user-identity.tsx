"use client";

import { Popover } from "@base-ui/react/popover";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import { ImageSlot } from "./image-slot";
import type { ShellSession } from "./types";
import { displayName, initials } from "./utils";

/**
 * Avatar redondo de 30px, como no protótipo. Nome, e-mail, perfil e saída ficam no painel que o
 * avatar abre, para o cabeçalho mostrar só o avatar.
 */
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
  const name = displayName(session);

  return (
    <Popover.Root>
      <Popover.Trigger
        className="relative flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-extrabold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${name}, ${role}. Abrir opções da conta`}
        title={session.email}
      >
        {initials(session)}
        <ImageSlot asset={session.avatar} className="absolute inset-0 size-full object-cover" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={8} className="z-[70]">
          <Popover.Popup className="w-64 max-w-[calc(100vw-28px)] rounded-lg border bg-popover p-3 text-popover-foreground shadow-surface outline-none">
            <Popover.Title className="truncate text-sm font-bold">{name}</Popover.Title>
            <Popover.Description className="truncate text-xs text-muted-foreground">{session.email}</Popover.Description>
            <p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{role}</p>
            {onSignOut ? (
              <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={onSignOut}>
                <LogOut />
                {signOutLabel}
              </Button>
            ) : null}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

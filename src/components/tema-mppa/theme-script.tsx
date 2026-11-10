// Sem "use client" de propósito: importado num Server Component (o app/layout.tsx), este módulo entrega a
// string do script, e não uma referência de cliente. O ThemeProvider lê a chave daqui.

export const THEME_STORAGE_KEY = "tema-mppa-theme";

/** Aplica o tema guardado na aba antes da hidratação: toda entrada abre em claro. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=sessionStorage.getItem('${THEME_STORAGE_KEY}')||'light';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(d?'dark':'light');}catch(e){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}})();`;

/**
 * Script de tema para o `<head>` do layout raiz. Com CSP, passe o mesmo `nonce` do consumidor; o
 * navegador esconde o atributo depois de ler, daí o `suppressHydrationWarning`.
 */
export function ThemeScript({ nonce }: { nonce?: string }) {
  return <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />;
}

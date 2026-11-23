// Sem "use client" de propósito: importado num Server Component (o app/layout.tsx), este módulo entrega a
// string do script, e não uma referência de cliente. O ThemeProvider lê a chave daqui.

export const THEME_STORAGE_KEY = "tema-mppa-theme";
export const SIDEBAR_STORAGE_KEY = "tema-mppa-sidebar-collapsed";

/**
 * Script de boot, antes da hidratação: aplica o tema guardado na aba (toda entrada abre em claro) e marca a
 * barra recolhida no <html> (`data-tm-sidebar`), para a casca não piscar em nenhum dos dois.
 */
export const THEME_BOOT_SCRIPT = `(function(){var h=document.documentElement;try{var t=sessionStorage.getItem('${THEME_STORAGE_KEY}')||'light';var d=t==='dark';h.classList.remove('light','dark');h.classList.add(d?'dark':'light');}catch(e){h.classList.remove('dark');h.classList.add('light')}try{h.setAttribute('data-tm-sidebar',localStorage.getItem('${SIDEBAR_STORAGE_KEY}')==='1'?'collapsed':'expanded');}catch(e){}})();`;

/**
 * Script de tema para o `<head>` do layout raiz. Com CSP, passe o mesmo `nonce` do consumidor; o
 * navegador esconde o atributo depois de ler, daí o `suppressHydrationWarning`.
 */
export function ThemeScript({ nonce }: { nonce?: string }) {
  return <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />;
}

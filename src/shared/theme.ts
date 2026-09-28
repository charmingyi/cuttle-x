/**
 * The light/dark/system preference. The dark tokens hang off a `dark` class on <html>
 * (see styles.css), and this module is the only writer: an inline script in the root document
 * applies the stored choice before first paint, this manages it afterwards, and a media-query
 * listener keeps `system` live.
 */

export type ThemeChoice = "light" | "dark" | "system"

const STORAGE_KEY = "cuttlex-theme"

export function storedTheme(): ThemeChoice {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "light" || value === "dark" || value === "system" ? value : "system"
  } catch {
    return "system"
  }
}

function systemDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/** Applies the class for a resolved dark (or not) document. */
export function applyTheme(choice: ThemeChoice) {
  document.documentElement.classList.toggle(
    "dark",
    choice === "dark" || (choice === "system" && systemDark()),
  )
}

export function setStoredTheme(choice: ThemeChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage refusal (private mode) still switches this page; only the memory is lost.
  }
  applyTheme(choice)
}

/** The pre-paint bootstrap, injected as a string so it runs before the first render. */
export const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"&&t!=="system")t="system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`

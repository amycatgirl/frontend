import type { JSX } from "solid-js";

import { HashRouter } from "@solidjs/router";
import { render } from "@solidjs/testing-library";

import i18n, { I18nContext } from "@revolt/i18n";
import { Masks, ThemeProvider, darkTheme } from "@revolt/ui";

/**
 * Inject Context above children
 */
export default function testMiddleware(children: () => JSX.Element) {
  return (
    <HashRouter>
      <I18nContext.Provider value={i18n}>
        <ThemeProvider theme={darkTheme()}>{children()}</ThemeProvider>
      </I18nContext.Provider>
      <Masks />
    </HashRouter>
  );
}

/**
 * Render with context
 */
export function renderWithContext(children: () => JSX.Element) {
  return render(() => testMiddleware(() => children()));
}

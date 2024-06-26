import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";

import { I18nContext, default as i18n, useTranslation } from "..";

const TranslatedText = () => {
  const t = useTranslation();

  return <div>{t("login.welcome")}</div>;
};

describe("Translation component", () => {
  it("should translate the text", () => {
    render(() => (
      <I18nContext.Provider value={i18n}>
        <TranslatedText />
      </I18nContext.Provider>
    ));

    const textElm = screen.getByText("Welcome!");
    expect(textElm).toBeInTheDocument();
  });
});

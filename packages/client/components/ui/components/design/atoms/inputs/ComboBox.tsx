import { styled } from "solid-styled-components";

/**
 * Dropdown element
 */
export const ComboBox = styled("select")`
  padding: 4px;
  height: fit-content;

  font-weight: 500;
  font-size: 0.9375rem;
  font-family: inherit;

  color: ${({ theme }) => theme!.colours.foreground};
  background: var(--unset-bg);

  box-sizing: border-box;
  border-radius: ${({ theme }) => theme!.borderRadius.md};
  border: 2px solid var(--unset-fg);

  outline: none;
  cursor: pointer;

  &:focus-visible {
    box-shadow: 0 0 0 1.5pt var(--unset-fg);
  }
`;

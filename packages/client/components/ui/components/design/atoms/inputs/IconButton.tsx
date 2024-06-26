import { styled } from "solid-styled-components";

/**
 * Simple icon action button
 */
export const IconButton = styled("a", "Action")`
  grid: 1/1;
  display: grid;
  cursor: pointer;
  place-self: normal;
  place-items: center;

  color: var(--unset-fg);

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }
`;

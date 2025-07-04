import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion, Presence } from "solid-motionone";

import { styled } from "styled-system/jsx";

import { Button } from "../inputs";

import { typography } from "./Typography";

export interface Modal2Props {
  show: boolean;
  onClose: () => void;
}

type Props = Modal2Props & {
  icon?: JSX.Element;
  title?: JSX.Element;
  children: JSX.Element;
  actions?: {
    text: JSX.Element;
    onClick?: () => void;
  }[];
  isDisabled?: boolean;

  minWidth?: number;
  padding?: number;
};

/**
 * Dialog container made according to the M3 specifications
 *
 * https://m3.material.io/components/dialogs/specs
 */
export function Modal2(props: Props) {
  return (
    <Portal mount={document.getElementById("floating")!}>
      <ModalScrim show={props.show} onClick={props.onClose}>
        <Presence>
          <Show when={props.show}>
            <Motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, easing: [0.05, 0.7, 0.1, 1.0] }}
            >
              <Container
                style={{
                  "min-width": props.minWidth
                    ? `${props.minWidth}px`
                    : undefined,
                  padding: props.padding ? `${props.padding}px` : undefined,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Show when={props.icon}>
                  <Icon>{props.icon}</Icon>
                </Show>
                <Show when={props.title}>
                  <Title withIcon={typeof props.icon !== "undefined"}>
                    {props.title}
                  </Title>
                </Show>
                <Content class={typography()}>{props.children}</Content>
                <Show when={props.actions}>
                  <Actions>
                    <For each={props.actions}>
                      {(action) => (
                        <Button
                          variant="text"
                          size="small"
                          onPress={() => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const value = action.onClick?.() as any;
                            if (value instanceof Promise) {
                              value.then(props.onClose).catch(() => {});
                            } else if (value !== false) {
                              props.onClose();
                            }
                          }}
                          isDisabled={props.isDisabled}
                        >
                          {action.text}
                        </Button>
                      )}
                    </For>
                  </Actions>
                </Show>
              </Container>
            </Motion.div>
          </Show>
        </Presence>
      </ModalScrim>
    </Portal>
  );
}

export const ModalScrim = styled("div", {
  base: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    zIndex: "100",

    maxHeight: "100%",

    display: "grid",
    userSelect: "none",
    placeItems: "center",

    pointerEvents: "all",
    background: "rgba(0, 0, 0, 0.6)",

    animationName: "scrimFadeIn",
    animationDuration: "0.1s",
    animationFillMode: "forwards",
    transition: "var(--transitions-medium) all",
  },
  variants: {
    show: {
      false: {
        animationName: "unset",
        pointerEvents: "none",
        background: "transparent",
      },
    },
    padding: {
      true: {
        padding: "80px",
      },
    },
    overflow: {
      true: {
        overflowY: "auto",
      },
    },
  },
  defaultVariants: {
    show: true,
    padding: true,
    overflow: true,
  },
});

const Container = styled("div", {
  base: {
    padding: "24px",
    minWidth: "280px",
    maxWidth: "560px",
    borderRadius: "28px",

    display: "flex",
    flexDirection: "column",

    color: "var(--md-sys-color-on-surface)",
    background: "var(--md-sys-color-surface-container-high)",
  },
});

const Icon = styled("div", {
  base: {
    alignSelf: "center",
    marginBottom: "16px",
  },
});

const Title = styled("span", {
  base: {
    ...typography.raw({ class: "headline", size: "small" }),
    marginBlockEnd: "16px",
  },
  variants: {
    withIcon: {
      true: {
        textAlign: "center",
      },
    },
  },
  defaultVariants: {
    withIcon: false,
  },
});

const Content = styled("div", {
  base: {
    color: "var(--md-sys-color-on-surface-variant)",
  },
});

const Actions = styled("div", {
  base: {
    gap: "8px",
    display: "flex",
    justifyContent: "end",
    marginBlockStart: "24px",
  },
});

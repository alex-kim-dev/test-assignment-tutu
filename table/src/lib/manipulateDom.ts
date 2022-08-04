export const $ = document.querySelector.bind(document);

export const $$ = document.querySelectorAll.bind(document);

export const createElement = (
  tagName: keyof HTMLElementTagNameMap,
  options?: Record<string, string>,
  children?: HTMLElement | HTMLElement[]
): HTMLElement => {
  const { text, ...attributes } = options ?? {};
  const el = document.createElement(tagName);

  if (text) el.textContent = text;

  Object.entries(attributes).forEach(([name, value]) => {
    el.setAttribute(name, value);
  });

  if (children) el.append(...(Array.isArray(children) ? children : [children]));

  return el;
};

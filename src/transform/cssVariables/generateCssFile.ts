import type { Entries } from "./isEntry.js";

function generateCssFile(className = ":root", entries: Entries = []): string {
  let resultClassName = className;

  if (!/^:/.test(resultClassName)) {
    resultClassName = `.${resultClassName}`;
  }

  const content = entries.reduce((accumulator, [key, value]) => {
    return `${accumulator}\n  ${key}: ${value};`;
  }, "");

  return `${resultClassName} {${content}\n}`;
}

export { generateCssFile };

import type { Entries } from "./isEntry.js";

function generateCssFile(
  className: string | null = ":root",
  entries: Entries = [],
): string {
  let resultClassName = className;

  const content = entries.reduce((accumulator, [key, value]) => {
    return `${accumulator}\n  ${key}: ${value};`;
  }, "");

  if (content.length < 1) {
    return "";
  }

  if (typeof resultClassName !== "string") {
    return content
      .split("\n")
      .map((string) => string.trim())
      .filter((string) => string.length > 0)
      .join("\n");
  }

  if (!/^:/.test(resultClassName) && !/^\./.test(resultClassName)) {
    resultClassName = `.${resultClassName}`;
  }

  return `${resultClassName} {${content}\n}`;
}

export { generateCssFile };

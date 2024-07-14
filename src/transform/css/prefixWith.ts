import type { Entries } from "./isEntry.js";

function prefixWith(entries: Entries, prefix: string): Entries {
  return entries.map(([key, value]) => [`${prefix}${key}`, value]);
}

export { prefixWith };

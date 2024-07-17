type Entry = [string, string | number];
type Entries = Entry[];

function isEntry(unknown: unknown): unknown is Entry {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return (
    unknown.length === 2 &&
    typeof unknown[0] === "string" &&
    (typeof unknown[1] === "string" ||
      (typeof unknown[1] === "number" && Number.isFinite(unknown[1])))
  );
}

function isEntries(unknown: unknown): unknown is Entries {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return unknown.length > 0 && unknown.every(isEntry);
}

export { isEntry, isEntries };
export type { Entry, Entries };

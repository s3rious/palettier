type Entry = [string, string];
type Entries = Entry[];

function isEntry(unknown: unknown): unknown is Entry {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return (
    unknown.length === 2 &&
    typeof unknown[0] === "string" &&
    typeof unknown[1] === "string"
  );
}

function isEntries(unknown: unknown): unknown is Entries {
  if (!Array.isArray(unknown)) {
    return false;
  }

  return unknown.every(isEntry);
}

export type { Entry, Entries };

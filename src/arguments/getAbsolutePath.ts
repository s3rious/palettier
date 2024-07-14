import { resolve } from "node:path";

function getAbsolutePath(string = ""): string {
  return resolve(process.cwd(), string);
}

export { getAbsolutePath };

import { resolve } from "node:path";

function Path(string = ""): string {
	return resolve(process.cwd(), string);
}

export { Path };

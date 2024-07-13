import { convertTokensToCssVariables as cssVariables } from "./cssVariables/convertTokensToCssVariables.js";
import { convertTokensToJson as json } from "./json/convertTokensToJson.js";

const transformers = {
	json,
	cssVariables,
};

export { transformers };

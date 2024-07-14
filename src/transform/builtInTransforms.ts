import { convertTokensToCssVariables as cssVariables } from "./cssVariables/convertTokensToCssVariables.js";
import { convertTokensToJson as json } from "./json/convertTokensToJson.js";

const builtInTransforms = {
  json,
  cssVariables,
};

export { builtInTransforms };

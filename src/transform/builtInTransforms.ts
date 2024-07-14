import { convertTokensToCssVariables as cssVariables } from "./css/cssVariables/convertTokensToCssVariables.js";
import { convertTokensToScss as scss } from "./css/scss/convertTokensToScss.js";
import { convertTokensToJsObject as jsObject } from "./js/convertTokensToJsObject.js";
import { convertTokensToJson as json } from "./json/convertTokensToJson.js";

const builtInTransforms = {
  json,
  cssVariables,
  scss,
  jsObject,
};

export { builtInTransforms };

const jsExportTypeMap = {
  default: "export default palette",
  named: "export { palette }",
  commonjs: "module.exports = palette",
} as const;

type JsExportType = keyof typeof jsExportTypeMap;
type JsExportTypeValue = (typeof jsExportTypeMap)[JsExportType];

function isJsExportType(string: string): string is JsExportType {
  const keys = Object.keys(jsExportTypeMap);
  return keys.includes(string);
}

function isJsExportTypeValue(string: string): string is JsExportTypeValue {
  const values = Object.values(jsExportTypeMap) as string[];
  return values.includes(string);
}

export type { JsExportType, JsExportTypeValue };
export { isJsExportType, isJsExportTypeValue, jsExportTypeMap };

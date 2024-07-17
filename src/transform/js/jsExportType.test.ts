import { describe, expect, test } from "@jest/globals";

import {
  isJsExportType,
  isJsExportTypeValue,
  jsExportTypeMap,
} from "./jsExportType";

describe("isJsExportType", () => {
  test("returns true for valid JS export type", () => {
    expect(isJsExportType("default")).toBe(true);
  });

  test("returns false for invalid JS export type", () => {
    expect(isJsExportType("invalid")).toBe(false);
  });
});

describe("isJsExportTypeValue", () => {
  test("returns true for valid JS export type value", () => {
    expect(isJsExportTypeValue(jsExportTypeMap.default)).toBe(true);
  });

  test("returns false for invalid JS export type value", () => {
    expect(isJsExportTypeValue("invalid")).toBe(false);
  });
});

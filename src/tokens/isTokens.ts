interface Tokens {
  [key: string]: string | number | boolean | Tokens;
}

function isTokens(argument: unknown): argument is Tokens {
  return Object.prototype.toString.call(argument) === "[object Object]";
}

export type { Tokens };
export { isTokens };

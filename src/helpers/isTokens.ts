function isTokens (argument: any): argument is Tokens {
  return Object.prototype.toString.call(argument) === '[object Object]'
}

export { isTokens }

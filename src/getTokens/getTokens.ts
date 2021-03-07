async function getTokens (path: string): Promise<Tokens> {
  return await import(path)
}

export { getTokens }

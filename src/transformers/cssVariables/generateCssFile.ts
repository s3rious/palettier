function generateCssFile (className: ClassName = ':root', entries: Entries = []): CssFile {
  const content = entries.reduce((accumulator, [key, value]) => {
    return `${accumulator}\n  ${key}: ${value};`
  }, '')

  if (/^\w/.test(className)) {
    className = `.${className}`
  }

  return `${className} {${content}\n}`
}

export { generateCssFile }

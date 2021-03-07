type Transform = [key: string | TransformerFunction, fileName: string, ...options: string[]]

interface Config {
  verbose: boolean
  src: string
  dist: string
  transform: Transform[]
}

import { resolve } from 'path'

function Path (string: string): string {
  return resolve(process.cwd(), string)
}

export { Path }

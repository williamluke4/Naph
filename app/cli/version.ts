import { Command } from './helpers/types'

const packageJson = require('../../package.json')

export class Version implements Command {
  static new(): Version {
    return new Version()
  }
  private constructor() {}
  async parse(argv: string[]) {
    return `${packageJson.name}@${packageJson.version}`
  }
}

/**
 * Command interface
 */
export interface Command {
  parse(argv: string[]): Promise<string | Error>
}

/**
 * Commands
 */
export type Commands = { [command: string]: Command }

export type Dictionary<T> = {
  [key: string]: T
}


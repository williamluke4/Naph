import chalk from 'chalk'
// import { Command, Commands, arg, isError, format, HelpError, unknownCommand } from '@prisma/cli'
import { Version } from './version'
import { Command, Commands } from './helpers/types'
import { isError, format } from 'util'
import { unknownCommand, HelpError } from './help'
import { arg } from './helpers/utils'
import { Run } from './run'

/**
 * CLI command
 */
export class CLI implements Command {
  static new(cmds: Commands): CLI {
    return new CLI(cmds)
  }
  private constructor(private readonly cmds: Commands) {}

  async parse(argv: string[]): Promise<string | Error> {
    // parse the args according to the following spec
    const args = arg(argv, {
      '--help': Boolean,
      '-h': '--help',
      '--version': Boolean,
      '-v': '--version',
    })
    if (isError(args)) {
      return this.help(args.message)
    }
    if (args['--version']) {
      return Version.new().parse(argv)
    }
    if (args['--help']) {
      return this.help()
    }
    if (args._.length === 0 || args._.length === 1){
      return Run.new().parse(args._)
    } 


    // check if we have that subcommand
    const cmd = this.cmds[args._[0]]
    if (cmd) {
      return cmd.parse(args._.slice(1))
    }
    // unknown command
    return unknownCommand(CLI.help, args._[0])
  }

  // help function
  private help(error?: string): string | HelpError {
    if (error) {
      return new HelpError(`\n${chalk.bold.red(`!`)} ${error}\n${CLI.help}`)
    }
    return CLI.help
  }

  // static help template
  private static help = format(`
    ${chalk.bold.green('Prisma Viewer   ಠ_ಠ')}

    ${chalk.bold('Usage')}
      ${chalk.dim(`$`)} pv [path]
      
    ${chalk.bold('Options')}
      -h, --help       Displays this help message
    ${chalk.bold('Examples')}
      ${chalk.dim(`$`)} pv 
      ${chalk.dim(`$`)} pv ./schema.prisma
  `)
}
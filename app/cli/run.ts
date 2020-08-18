import { Command } from "./helpers/types";
import { startServer } from '../server';



export class Run implements Command {
  static new(): Run {
    return new Run();
  }
  private constructor() {}
  async parse(args: string[]) {
    startServer(args && args[0])
    return ""
  }
}

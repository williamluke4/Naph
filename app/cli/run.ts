import { Command } from "./helpers/types";
import { startServer } from '../server';
import open from 'open';


export class Run implements Command {
  static new(): Run {
    return new Run();
  }
  private constructor() {}
  async parse(args: string[]) {
    startServer(args && args[0])
    open('http://localhost:8080');

    return ""
  }
}



import { getDMMF } from '@prisma/sdk';
import * as fs from 'fs';
// import chalk from 'chalk';
import chalk from 'chalk';
import { Command } from './helpers/types';
import * as path from 'path';
import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance = fastify.fastify({})

function getSchemaPath(schemaPath?: string): string {
  if(schemaPath && fs.existsSync(schemaPath)){
    return schemaPath;
  }
  const paths = ["./schema.prisma", "./prisma/schema.prisma"]
  for (const path of paths){
    if (fs.existsSync(path)) {
      return path
    }
  }
  throw Error(chalk.red("✗ Schema could not be found!"))
}

export class Run implements Command {
  static new(): Run {
    return new Run()
  }
  private constructor() {}
  async parse(args: string[]) {
    let datamodelPath = getSchemaPath(args && args[0])
    const dmmf = await getDMMF({datamodelPath})
    fs.writeFileSync(path.join(__dirname, '../../public/datamodel.json'), JSON.stringify(dmmf.datamodel), {encoding: 'utf8', flag: 'w' })
    console.log(chalk.green('✔ Data Model Generated'));
    // Require the framework and instantiate it

    server.register(require('fastify-static'), {
      root: path.join(__dirname, '../../public'),
      prefix: '/public/', // optional: default '/'
    })
    // Declare a route
    server.get('/', async (request, reply) => {
      (reply as any).sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
    })

    // Run the server!
    const start = async () => {
      try {
        await server.listen(3000)
        let address = server.server.address();
        address = typeof address === 'string' ? address : `${address?.address}:${address?.port}`
        console.log(`Server listening on http://${address}`)
      } catch (err) {
        process.exit(1)
      }
    }
    start()
    return ''
  }
}



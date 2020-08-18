import { getDMMF } from "@prisma/sdk";
import chalk from "chalk";
import * as fastify from "fastify";
import * as fs from "fs";
import * as path from "path";
import { logger } from "../logger";

const server: fastify.FastifyInstance = fastify.fastify({});

function getSchemaPath(schemaPath?: string): string {
  if (schemaPath && fs.existsSync(schemaPath)) {
    return schemaPath;
  }
  const paths = ["./schema.prisma", "./prisma/schema.prisma"];
  for (const path of paths) {
    if (fs.existsSync(path)) {
      logger.success(`Schema found at: ${path}`);
      return path;
    }
  }
  throw Error(chalk.red("✗ Schema could not be found!"));
}

export function startServer(schemaPath: string | undefined) {
  let datamodelPath = getSchemaPath(schemaPath);
  // fs.writeFileSync(
  //   path.join(__dirname, "../../public/datamodel.json"),
  //   JSON.stringify(dmmf.datamodel),
  //   { encoding: "utf8", flag: "w" }
  // );
  logger.success("Data Model Generated");
  // Require the framework and instantiate it

  server.register(require("fastify-static"), {
    root: path.join(__dirname, "../../public"),
    prefix: "/public/", // optional: default '/'
  });
  server.register(require("fastify-cors"), {
    // put your options here
    origin: (origin: any, cb: any) => {
      if (/localhost/.test(origin)) {
        //  Request from localhost will pass
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed"), false);
    },
  });
  // Declare a route
  // server.get("/", async (request, reply) => {
  //   console.log(request);
  //   (reply).sendFile("index.html"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
  // });
  server.get("/datamodel", async (request, reply) => {
    const dmmf = await getDMMF({ datamodelPath });
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(dmmf.datamodel);
  });
  // Run the server!
  const start = async () => {
    try {
      await server.listen(3000);
      let address = server.server.address();
      address =
        typeof address === "string"
          ? address
          : `${address?.address}:${address?.port}`;
      logger.success(`Server Listening on http://${address}`);
    } catch (err) {
      logger.error(err);
      process.exit(1);
    }
  };
  start();
}

import type { CommandBuilder } from "yargs";

export const command = "glue <command>";
export const desc = "Glue list all jobs";

export const builder: CommandBuilder = (yargs) => yargs.commandDir("glue");

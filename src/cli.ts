#!/usr/bin/env node

import yargs from "yargs";
import { handleError } from "./handleError";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .commandDir("commands")
  .strict()
  .fail(handleError)
  .alias({ h: "help" }).argv;

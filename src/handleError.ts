import chalk from "chalk";
import { EOL } from "os";
import { CredentialsProviderError } from "@aws-sdk/property-provider";

const printMessage = (message: string, hint = false) => {
  process.stderr.write(chalk.red(`${message}`) + EOL);
  if (hint) {
    process.stderr.write(
      `Hint: Use the ${chalk.green(
        "--help"
      )} option to get help about the usage` + EOL
    );
  }
};

export async function handleError(
  message: string,
  error: Error
): Promise<never> {
  if (message) {
    printMessage(message);
    process.exit(1);
  }

  let errorMessage = "Unknown error occurred";

  if (error) {
    errorMessage = error.message;
  }

  if (error instanceof CredentialsProviderError) {
    errorMessage =
      "Unable to locate credentials. You can configure credentials by running 'aws configure'";
  } else if (error.name == "ExpiredToken") {
    errorMessage =
      "ExpiredToken: The security token included in the request is expired";
  }

  printMessage(errorMessage);

  process.exit(1);
}

export function WriteJson(result: any): Promise<never> {
  process.stdout.write(JSON.stringify(result, null, 4));
  process.exit(0);
}

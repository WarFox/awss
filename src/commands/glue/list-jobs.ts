import { Glue } from "@aws-sdk/client-glue";
import { WriteJson } from "../../outputs";

export const command = "list-jobs";
export const desc = "Glue list all jobs";

async function recursivelyListJobs(
  acc: string[],
  glue: Glue,
  token?: string
): Promise<string[]> {
  if (token) {
    const { JobNames, NextToken } = await glue.listJobs({
      NextToken: token,
      MaxResults: 100,
    });
    return recursivelyListJobs([...acc, ...(JobNames || [])], glue, NextToken);
  } else {
    return acc;
  }
}

export async function listJobs(glue: Glue): Promise<string[]> {
  const { JobNames, NextToken } = await glue.listJobs({
    MaxResults: 100,
  });

  return await recursivelyListJobs(JobNames || [], glue, NextToken);
}

export async function handler() {
  const glue = new Glue({});
  const JobNames: string[] = await listJobs(glue);
  const result = { JobNames, Count: JobNames.length };

  WriteJson(result);
}

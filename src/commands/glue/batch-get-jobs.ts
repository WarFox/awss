import { Glue, Job } from "@aws-sdk/client-glue";
import { listJobs } from "./list-jobs";
import { WriteJson } from "../../outputs";

export const command = "batch-get-jobs";
export const desc = "Glue batch get all jobs";

async function recursivelyBatchGetJobs(
  acc: Job[],
  glue: Glue,
  jobNames: string[]
): Promise<Job[]> {
  if (jobNames.length == 0) {
    return acc;
  }

  // TODO what do do with JobsNotFound?
  const { Jobs } = await glue.batchGetJobs({
    JobNames: jobNames.slice(0, 25),
  });

  return await recursivelyBatchGetJobs(
    [...acc, ...(Jobs || [])],
    glue,
    jobNames.slice(25)
  );
}

export const handler = async () => {
  const glue = new Glue({});
  const jobNames: string[] = await listJobs(glue);
  const result = await recursivelyBatchGetJobs([], glue, jobNames);

  WriteJson(result);
};

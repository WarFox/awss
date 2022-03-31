
# Table of Contents

1.  [Installation](#installation)
2.  [Example](#example)
3.  [References](#references)

A Practical cli for list, get and batch get apis on AWS.

This cli tool provides list, get and batch get operations on AWS without
worrying about `NextToken`. Instead it fetches all of the resources.

Output is written to standard out and is mostly compatible with corresponding
AWS CLI output, so you could use a tool like \`jq\` in your command.


<a id="installation"></a>

# Installation

    brew install warfox/awss/awss

After installation this can be run by either \`awss\` or \`awsss\` command.


<a id="example"></a>

# Example

1.  List Glue jobs

Following command will list all glue jobs in your account, using NextToken internally

    awss glue list-jobs

1.  Batch Get Glue jobs

Following command using the \`BatchGetJobs\`

    awss glue batch-get-jobs


<a id="references"></a>

# References

-   <https://medium.com/geekculture/building-a-node-js-cli-with-typescript-packaged-and-distributed-via-homebrew-15ba2fadcb81>
-   <https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-glue/index.html>

# fusionauth-example-cloudfront-redirect

This example documents how to use a AWS CloudFront Function to redirect to country-specific URLs, such as a FusionAuth instance.

## Setup

### Create a CloudFront distribution
- see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html to create a distribution.

### Create a CloudFront function
- see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-tutorial.html to create a function.

    - see the example function https://github.com/FusionAuth/fusionauth-example-cloudfront-redirect/blob/main/aws/cloudfunction/function.js
    
    - see the example article https://saedf0.medium.com/directing-traffic-how-aws-cloudfront-functions-can-redirect-users-to-country-specific-urls-c488c9ed780 to redirect users to country-specific URLs.

    - see the example article https://github.com/aws-samples/amazon-cloudfront-functions/tree/main/redirect-based-on-country to URL redirect to the county-specific version of a site.


### Test the function using the AWS CLI

- Get the current version (ETAG) of the function
    ```
    aws cloudfront describe-function --name <function-name>
    ```

- cloudfront-viewer-country header set to `US`
    ```
    aws cloudfront test-function --if-match <ETAG> --name <function-name> --event-object fileb://./test/country-us.json
    ```

- cloudfront-viewer-country header set to `GB`
    ```
    aws cloudfront test-function --if-match <ETAG> --name <function-name> --event-object fileb://./test/country-gb.json
    ```

### Associate the function with the distribution
- see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/associate-function.html to add an association to the function.
    - Run the function every time CloudFront receives a request.
    - This creates a behavior for the distribution.

### Add the CloudFront-Viewer-Country header to each viewer request
- see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-cloudfront-headers.html about adding headers to a request.
- Add a origin request policy to the distribution behavior to add additional headers.
    - Specifically, add the policy AllViewerAndCloudFrontHeaders-2022-06 to include the CloudFront-Viewer-Country header which contains the two-letter country code for the viewer’s country.

### Test the distribution
- use the Distribution domain name or create an alternate domain name.


## More

Amazon CloudFront Functions, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html, is a serverless edge compute feature allowing you to run JavaScript code at 225+ Amazon CloudFront, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html, edge locations for lightweight HTTP(S) transformations and maniupulations.

Writing function code,
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/writing-function-code.html

const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "back-end",
  authorName: "YehTarnSu",
  authorEmail: "yehtarnsu@gmail.com",
  deps: [
    "aws-cdk-lib",
    "@aws-cdk/aws-apigatewayv2-alpha",
    "@aws-cdk/aws-apigatewayv2-integrations-alpha",
    "@aws-cdk/aws-lambda-python-alpha",
    "dotenv",
  ],
  gitignore: [".env"],
});
project.synth();

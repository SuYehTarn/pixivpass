const { AwsCdkTypeScriptApp } = require("projen");
const project = new AwsCdkTypeScriptApp({
  cdkVersion: "1.95.2",
  defaultReleaseBranch: "main",
  name: "back-end",
  authorName: "YehTarnSu",
  authorEmail: "yehtarnsu@gmail.com",
  cdkDependencies: [
    "@aws-cdk/aws-lambda",
    "@aws-cdk/aws-lambda-python",
    "@aws-cdk/aws-lambda-nodejs",
    "@aws-cdk/aws-apigatewayv2-integrations",
    "@aws-cdk/aws-apigatewayv2",
  ],
  deps: ["dotenv"],
  gitignore: [".env"],
});
project.synth();

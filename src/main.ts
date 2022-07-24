import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { HttpApi, HttpMethod, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import dotenv from "dotenv";

import {
  GetImageLambda,
  GetProfileLambda,
  // Operator,
} from "./components/lambda";

dotenv.config();

export class PixivPassStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const getProfile = new GetProfileLambda(this);
    const getImage = new GetImageLambda(this);
    // new Operator(this);

    const httpApi = new HttpApi(this, "pixiv-pass-http-api", {
      corsPreflight: {
        allowHeaders: ["*"],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.OPTIONS],
        allowOrigins: ["*"],
      },
    });
    httpApi.addRoutes({
      path: "/profile/{artworkId}",
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration("getProfileIntegration", getProfile),
    });
    httpApi.addRoutes({
      path: "/image/{artworkId}",
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration("getImageIntegration", getImage),
    });

    new CfnOutput(this, "http-api-url", {
      value: httpApi.url!,
    });
  }
}

// const devEnv = {
//   account: process.env.CDK_DEFAULT_ACCOUNT,
//   region: process.env.CDK_DEFAULT_REGION,
// };

const app = new App();

// new PixivPassStack(app, "pixiv-pass-stack-dev", { env: devEnv });
new PixivPassStack(app, "pixiv-pass-stack-prod");

app.synth();

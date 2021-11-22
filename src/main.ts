import { App, Construct, Stack, StackProps, CfnOutput } from "@aws-cdk/core";
import { LayerVersion } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { HttpApi, HttpMethod, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2";
import dotenv from "dotenv";

dotenv.config();

export class PixivPassStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const getProfile = new NodejsFunction(this, "get-profile", {
      entry: `${__dirname}/../lambda/getprofile/index.js`,
      bundling: {
        nodeModules: ["node-fetch"],
      },
    });
    const getImage = new PythonFunction(this, "get-image", {
      entry: `${__dirname}/../lambda/getimage`,
      layers: [
        LayerVersion.fromLayerVersionArn(
          this,
          "pixiv-pass-layer",
          process.env["PYTHON_LAYER_ARN"]!
        ),
      ],
    });

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
      integration: new LambdaProxyIntegration({
        handler: getProfile,
      }),
    });
    httpApi.addRoutes({
      path: "/image/{artworkId}",
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: getImage,
      }),
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

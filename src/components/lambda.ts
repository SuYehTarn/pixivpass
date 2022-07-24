import { Construct } from 'constructs';
import {
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import {
  ProcessingQueue,
} from "./sqs";

export class GetProfileLambda extends NodejsFunction {
  constructor(scope: Construct) {
    super(scope, "get-profile", {
      entry: `${__dirname}/../../lambda/getprofile/index.js`,
      bundling: {
        nodeModules: ["node-fetch"],
      },
      depsLockFilePath: `${__dirname}/../../lambda/getprofile/package-lock.json`,
    });
  }
}

export class GetImageLambda extends PythonFunction {
  constructor(scope: Construct) {
    super(scope, "get-image", {
      runtime: Runtime.PYTHON_3_9,
      entry: `${__dirname}/../../lambda/getimage`,
      layers: [
        LayerVersion.fromLayerVersionArn(
          scope,
          "pixiv-pass-layer",
          process.env["PYTHON_LAYER_ARN"]!
        ),
      ],
    });
  }
}

export class Operator extends PythonFunction {
  constructor(scope: Construct) {
    super(scope, "operator", {
      runtime: Runtime.PYTHON_3_9,
      entry: `${__dirname}/../../lambda/operator`,
    });

    const processingQueueEvenSource = new SqsEventSource(new ProcessingQueue(scope));
    this.addEventSource(processingQueueEvenSource);
  }
}
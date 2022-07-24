import { aws_sqs as sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ProcessingQueue extends sqs.Queue {
  constructor(scope: Construct) {
    super(scope, "processing-queue", {
      deadLetterQueue: {
        maxReceiveCount: 5,
        queue: new sqs.Queue(scope, "dead-letter-queue")
      }
    });
  }
}
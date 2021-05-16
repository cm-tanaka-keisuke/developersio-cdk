import * as cdk from '@aws-cdk/core';
import { CfnVPC } from '@aws-cdk/aws-ec2';

export class DevioStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CfnVPC(this, 'Vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: 'devio-stg-vpc' }]
    });
  }
}

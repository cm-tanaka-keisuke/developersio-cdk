import { expect, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Vpc', () => {
  const app = new cdk.App();
  const stack = new Devio.DevioStack(app, 'Vpc');

  expect(stack).to(countResources('AWS::EC2::VPC', 1));
  expect(stack).to(haveResource('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16',
    Tags: [{ 'Key': 'Name', 'Value': 'devio-stg-vpc' }]
  }));
});
